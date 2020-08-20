import crypto from 'crypto';
import ServerType from '../util/serverType';
import OptionType from '../util/optionType';

export default class URLHashing {
    private servers: Array<ServerType>;

    private map: Map<string, ServerType>;

    private keys: Array<string>;

    constructor(servers: Array<ServerType>) {
        this.servers = servers;
        this.map = new Map();
        this.keys = [];

        this.prep();
    }

    public nextServer(options: OptionType): string {
        const destURL = options.destURL;
        const server = this.findServer(destURL) || this.servers[0];
        const url = `${server.url}:${server.port}`;
        console.log(`Request redirected to ${server.id} - ${url}`);

        return url;
    }

    private prep(): void {
        this.servers.forEach((server: ServerType) => {
            const key = this.hash(server.id);
            this.map.set(key, server);
            this.keys.push(key);
        });

        this.keys.sort();
    }

    private findServer(srcIP: string): ServerType | undefined {
        const hashSrcIP = this.hash(srcIP);

        for (let i = 0; i < this.keys.length; i++) {
            if (this.keys[i] > hashSrcIP) {
                return this.map.get(this.keys[i]);
            }
        }

        return this.map.get(this.keys[0]);
    }

    private hash(key: string): string {
        return crypto.createHash('md5').update(key).digest('hex');
    }
}
