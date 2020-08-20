import ServerType from '../util/serverType';

export default class RoundRobin {
    private servers: Array<ServerType>;

    private counter: number;

    constructor(servers: Array<ServerType>) {
        this.servers = servers;
        this.counter = 0;
    }

    public nextServer(): string {
        const url = `${this.servers[this.counter].url}:${this.servers[this.counter].port}`;
        console.log(`Request redirected to ${this.servers[this.counter].id} - ${url}`);

        this.counter = (this.counter + 1) % this.servers.length;
        return url;
    }
}
