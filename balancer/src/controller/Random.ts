import ServerType from '../serverType';

export default class Random {
    private servers: Array<ServerType>;

    constructor(servers: Array<ServerType>) {
        this.servers = servers;
    }

    public nextServer(): string {
        const index = this.getRandom(0, this.servers.length - 1);
        const url = `${this.servers[index].url}:${this.servers[index].port}`;
        console.log(`Request redirected to ${this.servers[index].id} - ${url}`);

        return url;
    }

    private getRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
