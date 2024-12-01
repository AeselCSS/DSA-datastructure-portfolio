import SinglyLinkedList from "./singlyLinkedList.js";

// Example usage of SinglyLinkedList

const list = new SinglyLinkedList<number>();

// Test: Add elements to the list
list.add(10);
list.add(20);
list.add(30);

console.log("After adding elements:");
list.dumpList(); // Expected output: [10, 20, 30]

// Test: Get first and last element
console.log("First element:", list.getFirst()); // Expected output: 10
console.log("Last element:", list.getLast());   // Expected output: 30

// Test: Remove an element from the list
list.remove(20);
console.log("After removing 20:");
list.dumpList(); // Expected output: [10, 30]

// Test: Remove first element
list.removeFirstNode();
console.log("After removing the first node:");
list.dumpList(); // Expected output: [30]

// Test: Add more elements and get nodes
list.add(40);
list.add(50);
console.log("After adding 40 and 50:");
list.dumpList(); // Expected output: [30, 40, 50]

console.log("First node:", list.getFirstNode());         // Expected output: ListNode { data: 30, next: ... }
console.log("Last node:", list.getLastNode());           // Expected output: ListNode { data: 50, next: null }
console.log("Next node after 30:", list.getNextNode(list.getFirstNode()!)); // Expected output: ListNode { data: 40, next: ... }

// Test: Get node with specific data
console.log("Node with data 40:", list.getNodeWith(40)); // Expected output: ListNode { data: 40, next: ... }

// Test: Remove last node
list.removeLastNode();
console.log("After removing the last node:");
list.dumpList(); // Expected output: [30, 40]

// Test: Clear the list
list.clear();
console.log("After clearing the list:");
list.dumpList(); // Expected output: []

// Test: Size of the list
list.add(100);
list.add(200);
console.log("List size:", list.size()); // Expected output: 2

// Test: Ensure list remains correct after multiple operations
console.log("After multiple operations:");
list.dumpList(); // Expected output: [100, 200]
