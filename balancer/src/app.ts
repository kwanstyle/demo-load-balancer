import express from 'express';
import body from 'body-parser';
import request from 'request';
import config from './manifest.json';
import RoundRobin from './controller/round-robin';
import Random from './controller/random';
import WeightedRoundRobin from './controller/weighted-round-robin';
import WeightedRandom from './controller/weighted-random';
import ServerType from './serverType';

class Balancer {
    private app: express.Application;

    private port: number;

    private distributor: RoundRobin | Random | WeightedRoundRobin | WeightedRandom;

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

    private initDistributor(strategies: string): RoundRobin | Random | WeightedRoundRobin | WeightedRandom {
        let distributor: RoundRobin | Random | WeightedRoundRobin | WeightedRandom;
        switch (strategies) {
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
            default:
                distributor = new RoundRobin(this.servers);
                break;
        }

        return distributor;
    }

    private routing(): void {
        //Avoid browser sending an extra request
        this.app.get('/favicon.ico', (req: express.Request, res: express.Response) => res.status(204));

        this.app.get('*', (req: express.Request, res: express.Response): void => {
            req.pipe(
                request({ url: this.distributor.nextServer }).on('error', (error) => {
                    console.log(`Error: Failed to redirect the request`);
                    res.status(500).send(error.message);
                }),
            ).pipe(res);
        });
    }

    public start(): void {
        this.app.listen(this.port, () => console.log(`Load balancer is listening at localhost:${this.port}`));
    }
}

const args = process.argv.slice(2);
const server = new Balancer(args);
server.start();
