import ServerType from '../serverType';

export default class WeightedRandom {
    private servers: Array<ServerType>;

    constructor(servers: Array<ServerType>) {
        this.servers = this.generateList(servers);
    }

    public get nextServer(): string {
        const index = this.getRandom(0, this.servers.length - 1);
        const url = `${this.servers[index].url}:${this.servers[index].port}`;
        console.log(`Request redirected to ${this.servers[index].id} - ${url}`);

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

    private getRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
