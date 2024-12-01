class ListNode {
    data;
    next = null;
    prev = null;
    constructor(data) {
        this.data = data;
    }
}
class DoublyLinkedList {
    head = null;
    tail = null;
    length = 0;
    addLast(data) {
        const newNode = new ListNode(data);
        if (!this.tail) {
            this.head = this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }
    addFirst(data) {
        const newNode = new ListNode(data);
        if (!this.head) {
            this.head = this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }
    get(index) {
        const node = this.nodeAt(index);
        return node ? node.data : null;
    }
    indexOf(data) {
        let current = this.head;
        let index = 0;
        while (current) {
            if (current.data === data) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }
    insertAfter(index, data) {
        const currentNode = this.nodeAt(index);
        if (!currentNode)
            return;
        const newNode = new ListNode(data);
        newNode.next = currentNode.next;
        newNode.prev = currentNode;
        if (currentNode.next) {
            currentNode.next.prev = newNode;
        }
        else {
            this.tail = newNode;
        }
        currentNode.next = newNode;
        this.length++;
    }
    insertBefore(index, data) {
        const currentNode = this.nodeAt(index);
        if (!currentNode)
            return;
        const newNode = new ListNode(data);
        newNode.next = currentNode;
        newNode.prev = currentNode.prev;
        if (currentNode.prev) {
            currentNode.prev.next = newNode;
        }
        else {
            this.head = newNode;
        }
        currentNode.prev = newNode;
        this.length++;
    }
    first() {
        return this.head ? this.head.data : null;
    }
    last() {
        return this.tail ? this.tail.data : null;
    }
    remove(data) {
        const nodeToRemove = this.nodeAt(this.indexOf(data));
        if (nodeToRemove) {
            this.removeNode(nodeToRemove);
        }
    }
    removeIndex(index) {
        const nodeToRemove = this.nodeAt(index);
        if (nodeToRemove) {
            this.removeNode(nodeToRemove);
        }
    }
    removeFirst() {
        if (!this.head)
            return null;
        const removedData = this.head.data;
        this.removeNode(this.head);
        return removedData;
    }
    removeLast() {
        if (!this.tail)
            return null;
        const removedData = this.tail.data;
        this.removeNode(this.tail);
        return removedData;
    }
    addNodeLast(newNode) {
        if (!this.tail) {
            this.head = this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }
    addNodeFirst(newNode) {
        if (!this.head) {
            this.head = this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }
    insertAfterNode(newNode, existingNode) {
        newNode.next = existingNode.next;
        newNode.prev = existingNode;
        if (existingNode.next) {
            existingNode.next.prev = newNode;
        }
        else {
            this.tail = newNode;
        }
        existingNode.next = newNode;
        this.length++;
    }
    insertBeforeNode(newNode, existingNode) {
        newNode.next = existingNode;
        newNode.prev = existingNode.prev;
        if (existingNode.prev) {
            existingNode.prev.next = newNode;
        }
        else {
            this.head = newNode;
        }
        existingNode.prev = newNode;
        this.length++;
    }
    removeNode(existingNode) {
        if (existingNode.prev) {
            existingNode.prev.next = existingNode.next;
        }
        else {
            this.head = existingNode.next;
        }
        if (existingNode.next) {
            existingNode.next.prev = existingNode.prev;
        }
        else {
            this.tail = existingNode.prev;
        }
        this.length--;
    }
    nodeAt(index) {
        if (index < 0 || index >= this.length)
            return null;
        let current;
        if (index < this.length / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) {
                current = current.next;
            }
        }
        else {
            current = this.tail;
            for (let i = this.length - 1; i > index; i--) {
                current = current.prev;
            }
        }
        return current;
    }
    swapNodes(nodeA, nodeB) {
        if (nodeA === nodeB)
            return;
        const tempData = nodeA.data;
        nodeA.data = nodeB.data;
        nodeB.data = tempData;
    }
    clear() {
        this.head = this.tail = null;
        this.length = 0;
    }
    size() {
        return this.length;
    }
    dumpList() {
        let current = this.head;
        const elements = [];
        while (current) {
            elements.push(current.data);
            current = current.next;
        }
        console.log(elements);
    }
}
export { DoublyLinkedList, ListNode };
//# sourceMappingURL=doublyLinkedList.js.map