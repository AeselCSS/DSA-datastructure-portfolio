// Import the Stack class
import { Stack } from './stack.js';

console.log('=== Number Stack Examples ===');
const numberStack = new Stack<number>();

// Test push and size
console.log('\nTesting push and size:');
console.log('Initial size:', numberStack.size());  // 0
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log('Size after pushing 3 elements:', numberStack.size());  // 3

// Test peek
console.log('\nTesting peek:');
console.log('Top element:', numberStack.peek());  // 3
console.log('Size after peek:', numberStack.size());  // 3

// Test pop
console.log('\nTesting pop:');
console.log('Popped:', numberStack.pop());  // 3
console.log('New size:', numberStack.size());  // 2
console.log('New top element:', numberStack.peek());  // 2

// Test get
console.log('\nTesting get:');
console.log('Element at index 0:', numberStack.get(0));  // 2
console.log('Element at index 1:', numberStack.get(1));  // 1

// Test edge cases
console.log('\nTesting edge cases:');
console.log('Get invalid index:', numberStack.get(5));  // undefined
console.log('Pop until empty:');
console.log(numberStack.pop());  // 2
console.log(numberStack.pop());  // 1
console.log(numberStack.pop());  // undefined
console.log('Size after emptying:', numberStack.size());  // 0
console.log('Peek empty stack:', numberStack.peek());  // undefined

// Test with strings
console.log('\n=== String Stack Examples ===');
const stringStack = new Stack<string>();
stringStack.push("apple");
stringStack.push("banana");
stringStack.push("cherry");
console.log('Size:', stringStack.size());  // 3
console.log('Top element:', stringStack.peek());  // "cherry"
console.log('First element:', stringStack.get(0));  // "cherry"
console.log('Second element:', stringStack.get(1));  // "banana"

// Test with objects
console.log('\n=== Object Stack Examples ===');
interface Person {
    name: string;
    age: number;
}

const personStack = new Stack<Person>();
personStack.push({ name: "Alice", age: 25 });
personStack.push({ name: "Bob", age: 30 });

console.log('Size:', personStack.size());  // 2
console.log('Top person:', personStack.peek());  // { name: "Bob", age: 30 }
console.log('Popped person:', personStack.pop());  // { name: "Bob", age: 30 }
console.log('New top person:', personStack.peek());  // { name: "Alice", age: 25 }