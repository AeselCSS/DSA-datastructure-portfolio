// Class named ListNode that represents a node in a singly linked list
// The name "Node" already exist in the TS DOM library so it is named ListNode instead
class ListNode {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  class SinglyLinkedList {
    constructor() {
      this.head = null;
      this.length = 0;
    }
  
    // Metoder der arbejder med data
    add(data) {
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
  
    remove(data) {
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
  
    getFirst() {
      return this.head ? this.head.data : null;
    }
  
    getLast() {
      if (!this.head) return null;
  
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      return current.data;
    }
  
    // Metoder der arbejder med nodes
    getFirstNode() {
      return this.head;
    }
  
    getNextNode(node) {
      return node.next;
    }
  
    getLastNode() {
      if (!this.head) return null;
  
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      return current;
    }
  
    getNodeWith(data) {
      let current = this.head;
      while (current) {
        if (current.data === data) {
          return current;
        }
        current = current.next;
      }
      return null;
    }
  
    removeFirstNode() {
      if (this.head) {
        this.head = this.head.next;
        this.length--;
      }
    }
  
    removeLastNode() {
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
  
    removeNode(node) {
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
    clear() {
      this.head = null;
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
  