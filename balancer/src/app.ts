import express from 'express';
import body from 'body-parser';
import request from 'request';
import config from './manifest.json';
import {
    DistributorType,
    RoundRobin,
    Random,
    WeightedRoundRobin,
    WeightedRandom,
    SmoothWeightedRoundRobin,
    IPHashing,
    URLHashing,
    None,
} from './controller/all';
import ServerType from './util/serverType';
import OptionType from './util/optionType';

class Balancer {
    private app: express.Application;

    private port: number;

    private distributor: DistributorType;

    private servers: Array<ServerType>;

    constructor(args: Array<string>) {
        this.app = express();
        this.app.use(body.json());

        this.servers = config.servers;

        this.port = config.balancer.port;

        const strategy = this.parser(args);
        if (!strategy) {
            process.exit();
        }

        this.distributor = this.initDistributor(strategy);

        this.routing();
    }

    private parser(args: Array<string>): string | null {
        if (args.length != 1) {
            console.error('Error: Invalid parameters');
            return null;
        } else if (!config.strategies.includes(args[0])) {
            console.error('Error: Invalid strategies of balancing');
            return null;
        }

        return args[0];
    }

    private initDistributor(strategies: string): DistributorType {
        let distributor: DistributorType;
        switch (strategies) {
            case 'none':
                distributor = new None(this.servers);
                break;
            case 'round-robin':
                distributor = new RoundRobin(this.servers);
                break;
            case 'random':
                distributor = new Random(this.servers);
                break;
            case 'weighted-round-robin':
                distributor = new WeightedRoundRobin(this.servers);
                break;
            case 'weighted-random':
                distributor = new WeightedRandom(this.servers);
                break;
            case 'smooth-weighted-round-robin':
                distributor = new SmoothWeightedRoundRobin(this.servers);
                break;
            case 'ip-hashing':
                distributor = new IPHashing(this.servers);
                break;
            case 'url-hashing':
                distributor = new URLHashing(this.servers);
                break;
            default:
                distributor = new None(this.servers);
                break;
        }

        return distributor;
    }

    private routing(): void {
        //Avoid browser sending an extra request
        this.app.get('/favicon.ico', (req: express.Request, res: express.Response) => res.status(204));

        this.app.get('*', (req: express.Request, res: express.Response): void => {
            const srcIP: string = req.connection.remoteAddress || '';
            const destURL: string = req.protocol + '://' + req.get('host') + req.originalUrl;

            const options: OptionType = { srcIP, destURL };
            req.pipe(
                request({ url: this.distributor.nextServer(options) }).on('error', (error) => {
                    console.log(`Error: Failed to redirect the request`);
                    res.status(500).send(error.message);
                }),
            ).pipe(res);
        });
    }

    public start(): void {
        this.app.listen(this.port, '0.0.0.0', () =>
            console.log(`Load balancer is listening at localhost:${this.port}`),
        );
    }
}

const args = process.argv.slice(2);
const server = new Balancer(args);
server.start();
