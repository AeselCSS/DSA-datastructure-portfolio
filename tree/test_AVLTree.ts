import { Comparable } from './types.js';
import AVLTree from './AVLTree.js';

// Example 1: Basic number storage with a wrapper
class NumberWrapper implements Comparable<NumberWrapper> {
    constructor(public value: number) {}
    
    compareTo(other: NumberWrapper): number {
        return this.value - other.value;
    }
    
    toString(): string {
        return this.value.toString();
    }
}

function demonstrateBasicUsage() {
    console.log("\nExample 1: Basic Number Storage");
    const numberTree = new AVLTree<NumberWrapper>();
    
    // Insert some numbers
    [5, 3, 7, 1, 9, 2, 8].forEach(n => numberTree.insert(new NumberWrapper(n)));
    
    console.log("Tree after insertions:");
    numberTree.visualize();
    
    // Demonstrate traversals
    console.log("\nIn-order traversal (sorted):");
    numberTree.inOrderTraversal(n => process.stdout.write(n.value + " "));
    
    // Remove some numbers
    console.log("\n\nRemoving 3 and 7");
    numberTree.remove(new NumberWrapper(3));
    numberTree.remove(new NumberWrapper(7));
    
    console.log("Tree after removals:");
    numberTree.visualize();
}

// Example 2: Using custom objects
class Task implements Comparable<Task> {
    constructor(
        public priority: number,
        public description: string
    ) {}
    
    compareTo(other: Task): number {
        return this.priority - other.priority;
    }
    
    toString(): string {
        return `[${this.priority}] ${this.description}`;
    }
}

function demonstratePriorityQueue() {
    console.log("\nExample 2: Priority Queue Implementation");
    const taskQueue = new AVLTree<Task>();
    
    // Add some tasks
    const tasks = [
        new Task(3, "Review code"),
        new Task(1, "Fix critical bug"),
        new Task(2, "Write documentation"),
        new Task(5, "Plan next sprint"),
        new Task(4, "Update dependencies")
    ];
    
    tasks.forEach(task => taskQueue.insert(task));
    
    console.log("Task queue (ordered by priority):");
    taskQueue.visualize();
    
    // Process highest priority tasks
    console.log("\nProcessing two highest priority tasks:");
    const task1 = taskQueue.getMinValue();
    taskQueue.remove(task1!);
    console.log(`Completed: ${task1?.description}`);
    
    const task2 = taskQueue.getMinValue();
    taskQueue.remove(task2!);
    console.log(`Completed: ${task2?.description}`);
    
    console.log("\nRemaining tasks:");
    taskQueue.visualize();
}

// Example 3: Student grade tracking
class Student implements Comparable<Student> {
    constructor(
        public name: string,
        public grade: number
    ) {}
    
    compareTo(other: Student): number {
        return this.grade - other.grade;
    }
    
    toString(): string {
        return `${this.name}: ${this.grade}`;
    }
}

function demonstrateGradeTracking() {
    console.log("\nExample 3: Student Grade Tracking");
    const gradeBook = new AVLTree<Student>();
    
    // Add student grades
    const students = [
        new Student("Alice", 95),
        new Student("Bob", 87),
        new Student("Charlie", 92),
        new Student("David", 78),
        new Student("Eve", 98)
    ];
    
    students.forEach(student => gradeBook.insert(student));
    
    console.log("Class grades (ordered by score):");
    gradeBook.visualize();
    
    // Find class statistics
    console.log("\nClass Statistics:");
    console.log(`Highest grade: ${gradeBook.getMaxValue()?.toString()}`);
    console.log(`Lowest grade: ${gradeBook.getMinValue()?.toString()}`);
    
    // Get sorted list of grades
    console.log("\nGraded list of students:");
    gradeBook.inOrderTraversal((student: Student): void => {
        console.log(student.toString());
    });
}

// Run all demonstrations
function runDemonstrations() {
    console.log("AVL Tree Usage Demonstrations\n");
    console.log("=".repeat(50));
    
    demonstrateBasicUsage();
    console.log("\n" + "=".repeat(50));
    
    demonstratePriorityQueue();
    console.log("\n" + "=".repeat(50));
    
    demonstrateGradeTracking();
}

runDemonstrations();