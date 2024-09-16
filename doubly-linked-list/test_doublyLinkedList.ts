import {ListNode, DoublyLinkedList} from "./doublyLinkedList";

const list = new DoublyLinkedList<number>();

// Test: Add elements to the list
list.addFirst(10);
list.addLast(20);
list.addLast(30);

console.log("After adding elements:");
list.dumpList(); // Expected output: [10, 20, 30]

// Test: Insert after an index
list.insertAfter(1, 25);
console.log("After inserting 25 after index 1:");
list.dumpList(); // Expected output: [10, 20, 25, 30]

// Test: Insert before an index
list.insertBefore(0, 5);
console.log("After inserting 5 before index 0:");
list.dumpList(); // Expected output: [5, 10, 20, 25, 30]

// Test: Get first and last element
console.log("First element:", list.first()); // Expected output: 5
console.log("Last element:", list.last());   // Expected output: 30

// Test: Remove an element by value
list.remove(20);
console.log("After removing 20:");
list.dumpList(); // Expected output: [5, 10, 25, 30]

// Test: Get an element by index
console.log("Element at index 2:", list.get(2)); // Expected output: 25

// Test: Get index of an element by value
console.log("Index of 25:", list.indexOf(25)); // Expected output: 2

// Test: Remove first and last element
list.removeFirst();
console.log("After removing the first element:");
list.dumpList(); // Expected output: [10, 25, 30]

list.removeLast();
console.log("After removing the last element:");
list.dumpList(); // Expected output: [10, 25]

// Test: Clear the list
list.clear();
console.log("After clearing the list:");
list.dumpList(); // Expected output: []

// Test: Add nodes directly
const node1 = new ListNode(100);
const node2 = new ListNode(200);
list.addNodeFirst(node1);
list.addNodeLast(node2);
console.log("After adding nodes directly:");
list.dumpList(); // Expected output: [100, 200]

// Test: Insert nodes before and after other nodes
const node3 = new ListNode(150);
list.insertAfterNode(node3, node1); // Insert 150 after 100
console.log("After inserting node 150 after 100:");
list.dumpList(); // Expected output: [100, 150, 200]

// Test: Swap two nodes
list.swapNodes(node1, node3); // Swap 100 and 150
console.log("After swapping node 100 and 150:");
list.dumpList(); // Expected output: [150, 100, 200]
