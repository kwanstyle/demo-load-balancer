import ServerType from '../serverType';

export default class WeightedRoundRobin {
    private servers: Array<ServerType>;

    private counter: number;

    constructor(servers: Array<ServerType>) {
        this.servers = this.generateList(servers);
        this.counter = 0;
    }

    public get nextServer(): string {
        const url = `${this.servers[this.counter].url}:${this.servers[this.counter].port}`;
        console.log(`Request redirected to ${this.servers[this.counter].id} - ${url}`);

        this.counter = (this.counter + 1) % this.servers.length;
        return url;
    }

    private generateList(servers: Array<ServerType>): Array<ServerType> {
        const list: Array<ServerType> = [];
        servers.forEach((server) => {
            for (let i = 0; i < server.weight; i++) {
                list.push({ ...server });
            }
        });
        return list;
    }
}
