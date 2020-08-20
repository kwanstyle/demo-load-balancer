import ServerType from '../util/serverType';

export default class None {
    private servers: Array<ServerType>;

    private index: number;

    constructor(servers: Array<ServerType>) {
        this.servers = servers;
        this.index = this.getRandom(0, servers.length);
    }

    public nextServer(): string {
        const url = `${this.servers[this.index].url}:${this.servers[this.index].port}`;
        console.log(`Request redirected to ${this.servers[this.index].id} - ${url}`);

        return url;
    }

    private getRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
