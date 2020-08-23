import serverType from './serverType';

class Node {
    public server: serverType;
    public conn: number;

    constructor(server, conn) {
        this.server = server;
        this.conn = conn;
    }
}

export default class MinHeap {
    private capacity: number;
    private size: number;
    private items: Array<Node>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.size = 0;
        this.items = [];
    }

    private getLeftChildIndex(targetIndex: number): number {
        return 2 * targetIndex + 1;
    }

    private getRightChildIndex(targetIndex: number): number {
        return 2 * targetIndex + 2;
    }

    private getParentIndex(targetIndex: number): number {
        return Math.floor((targetIndex - 1) / 2);
    }

    private hasLeftChild(targetIndex: number): boolean {
        return this.getLeftChildIndex(targetIndex) < this.size;
    }

    private hasRightChild(targetIndex: number): boolean {
        return this.getRightChildIndex(targetIndex) < this.size;
    }

    private hasParent(targetIndex: number): boolean {
        return this.getParentIndex(targetIndex) >= 0;
    }

    private getLeftChild(targetIndex: number): Node {
        return this.items[this.getLeftChildIndex(targetIndex)];
    }
    private getRightChild(targetIndex: number): Node {
        return this.items[this.getRightChildIndex(targetIndex)];
    }

    private getParent(targetIndex: number): Node {
        return this.items[this.getParentIndex(targetIndex)];
    }

    private swapByIndex(indexA: number, indexB: number): void {
        [this.items[indexA], this.items[indexB]] = [this.items[indexB], this.items[indexA]];
    }

    private heapifyDown(): void {
        let current = 0;
        //依据从上到下从左往右的顺序，如果没有左子节点，那必然没有右子节点
        while (this.hasLeftChild(current)) {
            let smallerChildIndex = this.getLeftChildIndex(current);
            if (this.hasRightChild(current) && this.getRightChild(current) < this.getLeftChild(current)) {
                smallerChildIndex = this.getRightChildIndex(current);
            }

            if (this.items[current].conn < this.items[smallerChildIndex].conn) {
                break;
            } else {
                this.swapByIndex(current, smallerChildIndex);
            }

            current = smallerChildIndex;
        }
    }

    private heapifyUp(): void {
        let current = this.size - 1;
        while (this.hasParent(current) && this.getParent(current).conn > this.items[current].conn) {
            this.swapByIndex(this.getParentIndex(current), current);
            current = this.getParentIndex(current);
        }
    }

    public peek(): Node {
        if (this.size === 0) {
            return null;
        }

        return this.items[0];
    }

    public poll(): Node {
        if (this.size === 0) {
            return null;
        }

        const result: Node = this.items[0];
        this.items[0] = this.items[this.size - 1];
        this.size--;
        this.heapifyDown();
        return result;
    }

    public offer(element: Node): void {
        if (this.size >= this.capacity) {
            return;
        }

        this.items[this.size] = element;
        this.size++;
        this.heapifyUp();
    }
}
