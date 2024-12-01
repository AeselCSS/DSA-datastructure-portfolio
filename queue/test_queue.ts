import { Queue } from './queue.js';

const queue = new Queue<number>();

console.log("Enqueue 1, 2, 3");
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log("Peek:", queue.peek()); // Should print 1
console.log("Size:", queue.size()); // Should print 3

console.log("Dequeue:", queue.dequeue()); // Should print 1
console.log("Peek after dequeue:", queue.peek()); // Should print 2
console.log("Size after dequeue:", queue.size()); // Should print 2

console.log("Get element at index 0:", queue.get(0)); // Should print 2
console.log("Get element at index 1:", queue.get(1)); // Should print 3
console.log("Get element at index 2:", queue.get(2)); // Should print null

console.log("Dequeue all elements");
console.log("Dequeue:", queue.dequeue()); // Should print 2
console.log("Dequeue:", queue.dequeue()); // Should print 3
console.log("Dequeue from empty queue:", queue.dequeue()); // Should print null

console.log("Peek from empty queue:", queue.peek()); // Should print null
console.log("Size of empty queue:", queue.size()); // Should print 0