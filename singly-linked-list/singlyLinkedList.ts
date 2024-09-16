// Class named ListNode that represents a node in a singly linked list
// The name "Node" already exist in TS DOM library so it is named ListNode instead
class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

class SinglyLinkedList<T> {
  private head: ListNode<T> | null = null;
  private length: number = 0;

  // Metoder der arbejder med data
  add(data: T): void {
    const newNode = new ListNode(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length++;
  }

  remove(data: T): void {
    if (!this.head) return;

    if (this.head.data === data) {
      this.head = this.head.next;
      this.length--;
      return;
    }

    let current = this.head;
    while (current.next && current.next.data !== data) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      this.length--;
    }
  }

  getFirst(): T | null {
    return this.head ? this.head.data : null;
  }

  getLast(): T | null {
    if (!this.head) return null;

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    return current.data;
  }

  // Metoder der arbejder med nodes
  getFirstNode(): ListNode<T> | null {
    return this.head;
  }

  getNextNode(node: ListNode<T>): ListNode<T> | null {
    return node.next;
  }

  getLastNode(): ListNode<T> | null {
    if (!this.head) return null;

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    return current;
  }

  getNodeWith(data: T): ListNode<T> | null {
    let current = this.head;
    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  removeFirstNode(): void {
    if (this.head) {
      this.head = this.head.next;
      this.length--;
    }
  }

  removeLastNode(): void {
    if (!this.head) return;

    if (!this.head.next) {
      this.head = null;
      this.length--;
      return;
    }

    let current = this.head;
    while (current.next && current.next.next) {
      current = current.next;
    }
    current.next = null;
    this.length--;
  }

  removeNode(node: ListNode<T>): void {
    if (!this.head) return;

    if (this.head === node) {
      this.head = this.head.next;
      this.length--;
      return;
    }

    let current = this.head;
    while (current.next && current.next !== node) {
      current = current.next;
    }

    if (current.next === node) {
      current.next = current.next.next;
      this.length--;
    }
  }

  // Metoder der arbejder med hele listen
  clear(): void {
    this.head = null;
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

// Eksempel på brug af SinglyLinkedList
const list = new SinglyLinkedList<string>();
list.add("enemy1");
list.add("enemy2");
list.add("enemy3");
list.dumpList(); // ["enemy1", "enemy2", "enemy3"]

export default SinglyLinkedList;