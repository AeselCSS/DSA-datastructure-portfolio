class ListNode<T> {
    data: T;
    next: ListNode<T> | null = null;
    prev: ListNode<T> | null = null;
  
    constructor(data: T) {
      this.data = data;
    }
  }
  
  class DoublyLinkedList<T> {
    private head: ListNode<T> | null = null;
    private tail: ListNode<T> | null = null;
    private length: number = 0;
  
    // Metoder der arbejder med data
    addLast(data: T): void {
      const newNode = new ListNode(data);
      if (!this.tail) {
        this.head = this.tail = newNode;
      } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
      this.length++;
    }
  
    addFirst(data: T): void {
      const newNode = new ListNode(data);
      if (!this.head) {
        this.head = this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
      this.length++;
    }
  
    get(index: number): T | null {
      const node = this.nodeAt(index);
      return node ? node.data : null;
    }
  
    indexOf(data: T): number {
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
  
    insertAfter(index: number, data: T): void {
      const currentNode = this.nodeAt(index);
      if (!currentNode) return;
  
      const newNode = new ListNode(data);
      newNode.next = currentNode.next;
      newNode.prev = currentNode;
  
      if (currentNode.next) {
        currentNode.next.prev = newNode;
      } else {
        this.tail = newNode;
      }
  
      currentNode.next = newNode;
      this.length++;
    }
  
    insertBefore(index: number, data: T): void {
      const currentNode = this.nodeAt(index);
      if (!currentNode) return;
  
      const newNode = new ListNode(data);
      newNode.next = currentNode;
      newNode.prev = currentNode.prev;
  
      if (currentNode.prev) {
        currentNode.prev.next = newNode;
      } else {
        this.head = newNode;
      }
  
      currentNode.prev = newNode;
      this.length++;
    }
  
    first(): T | null {
      return this.head ? this.head.data : null;
    }
  
    last(): T | null {
      return this.tail ? this.tail.data : null;
    }
  
    remove(data: T): void {
      const nodeToRemove = this.nodeAt(this.indexOf(data));
      if (nodeToRemove) {
        this.removeNode(nodeToRemove);
      }
    }
  
    removeIndex(index: number): void {
      const nodeToRemove = this.nodeAt(index);
      if (nodeToRemove) {
        this.removeNode(nodeToRemove);
      }
    }
  
    removeFirst(): T | null {
      if (!this.head) return null;
  
      const removedData = this.head.data;
      this.removeNode(this.head);
      return removedData;
    }
  
    removeLast(): T | null {
      if (!this.tail) return null;
  
      const removedData = this.tail.data;
      this.removeNode(this.tail);
      return removedData;
    }
  
    // Metoder der arbejder med nodes
    addNodeLast(newNode: ListNode<T>): void {
      if (!this.tail) {
        this.head = this.tail = newNode;
      } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
      this.length++;
    }
  
    addNodeFirst(newNode: ListNode<T>): void {
      if (!this.head) {
        this.head = this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
      this.length++;
    }
  
    insertAfterNode(newNode: ListNode<T>, existingNode: ListNode<T>): void {
      newNode.next = existingNode.next;
      newNode.prev = existingNode;
  
      if (existingNode.next) {
        existingNode.next.prev = newNode;
      } else {
        this.tail = newNode;
      }
  
      existingNode.next = newNode;
      this.length++;
    }
  
    insertBeforeNode(newNode: ListNode<T>, existingNode: ListNode<T>): void {
      newNode.next = existingNode;
      newNode.prev = existingNode.prev;
  
      if (existingNode.prev) {
        existingNode.prev.next = newNode;
      } else {
        this.head = newNode;
      }
  
      existingNode.prev = newNode;
      this.length++;
    }
  
    removeNode(existingNode: ListNode<T>): void {
      if (existingNode.prev) {
        existingNode.prev.next = existingNode.next;
      } else {
        this.head = existingNode.next;
      }
  
      if (existingNode.next) {
        existingNode.next.prev = existingNode.prev;
      } else {
        this.tail = existingNode.prev;
      }
  
      this.length--;
    }
  
    nodeAt(index: number): ListNode<T> | null {
      if (index < 0 || index >= this.length) return null;
  
      let current: ListNode<T> | null;
      if (index < this.length / 2) {
        current = this.head;
        for (let i = 0; i < index; i++) {
          current = current!.next;
        }
      } else {
        current = this.tail;
        for (let i = this.length - 1; i > index; i--) {
          current = current!.prev;
        }
      }
  
      return current;
    }
  
    swapNodes(nodeA: ListNode<T>, nodeB: ListNode<T>): void {
      if (nodeA === nodeB) return;
  
      const tempData = nodeA.data;
      nodeA.data = nodeB.data;
      nodeB.data = tempData;
    }
  
    // Metoder der arbejder med hele listen
    clear(): void {
      this.head = this.tail = null;
      this.length = 0;
    }
  
    size(): number {
      return this.length;
    }
  
    dumpList(): void {
      let current = this.head;
      const elements: T[] = [];
      while (current) {
        elements.push(current.data);
        current = current.next;
      }
      console.log(elements);
    }
  }

  export { DoublyLinkedList, ListNode };