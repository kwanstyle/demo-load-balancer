import ServerType from '../util/serverType';
import MinHeap, { Node } from '../util/minHeap';

export default class WeightedLeastConnection {
    private servers: Array<ServerType>;

    private heap: MinHeap;

    private cache: Map<string, Node>;

    constructor(servers: Array<ServerType>) {
        this.servers = servers;

        this.cache = new Map();

        this.heap = new MinHeap(servers.length);
        for (let i = 0; i < this.servers.length; i++) {
            this.heap.offer(new Node(i, 0));
        }
    }

    public nextServer(): string {
        let nextServerNode = this.heap.poll();

        if (nextServerNode === null) {
            nextServerNode = new Node(0, 0);
        }

        const url = `${this.servers[nextServerNode.serverIndex].url}:${this.servers[nextServerNode.serverIndex].port}`;
        this.cache.set(url, nextServerNode);
        console.log(`Request redirected to ${this.servers[nextServerNode.serverIndex].id} - ${url}`);
        return url;
    }

    public update(serverUrl: string, conn: number): void {
        const currentServerNode = this.cache.get(serverUrl);

        if (currentServerNode === undefined) {
            return;
        }

        const weight = this.servers[currentServerNode.serverIndex].weight;
        currentServerNode.conn = Math.floor(conn / weight);
        this.heap.offer(currentServerNode);
        this.cache.delete(serverUrl);
    }
}
