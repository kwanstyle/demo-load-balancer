import ServerType from '../serverType';

export default class SmoothWeightedRoundRobin {
    private servers: Array<ServerType>;

    private initialWeights: Array<number>;

    constructor(servers: Array<ServerType>) {
        this.servers = servers;
        this.initialWeights = servers.map((server: ServerType) => server.weight);
    }

    public nextServer(): string {
        const serverIndex = this.getIndex();
        const url = `${this.servers[serverIndex].url}:${this.servers[serverIndex].port}`;
        console.log(`Request redirected to ${this.servers[serverIndex].id} - ${url}`);

        return url;
    }

    private getIndex(): number {
        let weightSum = 0;
        let maxWeight = 0;
        let posMaxWeight = 0;

        for (let i = 0; i < this.servers.length; i++) {
            weightSum += this.servers[i].weight;
            if (this.servers[i].weight > maxWeight) {
                maxWeight = this.servers[i].weight;
                posMaxWeight = i;
            }
        }

        for (let i = 0; i < this.servers.length; i++) {
            if (i === posMaxWeight) {
                this.servers[i].weight = this.servers[i].weight - weightSum + this.initialWeights[i];
            } else {
                this.servers[i].weight += this.initialWeights[i];
            }
        }

        return posMaxWeight;
    }
}
