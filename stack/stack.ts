
class StackNode<T> {
  data: T;
  next: StackNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

export class Stack<T> {
  private tail: StackNode<T> | null;
  private length: number;

  constructor() {
    this.tail = null;
    this.length = 0;
  }

  // Pushes an element onto the stack
  push(data: T): void {
    const node = new StackNode(data);
    node.next = this.tail;
    this.tail = node;
    this.length++;
  }

  // Pops an element from the stack
  pop(): T | undefined {
    if (!this.tail) return undefined;

    const data = this.tail.data;
    this.tail = this.tail.next;
    this.length--;
    return data;
}

  // Returns the element at the tail of the stack
  peek(): T | undefined {
    return this.tail?.data;
}

  // Returns the number of elements in the stack
  size(): number {
    return this.length;
  }

  // Returns the element at the specified index
  get(index: number): T | undefined {
    if (index < 0 || index >= this.length) return undefined;

    let current = this.tail;
    for (let i = 0; i < index && current; i++) {
        current = current.next;
    }
    return current?.data;
}
}