import { Comparable } from './types.js';
import BSTNode from './BSTreeNode.js';

class BSTree<T extends Comparable<T>> {
    root: BSTNode<T> | null = null;

    insert(value: T): void {
        if (!this.root) {
            this.root = new BSTNode(value);
        } else {
            this.root = this.root.insert(value);
        }
    }

    find(value: T): T | null {
        const node = this.root?.find(value);
        return node ? node.value : null;
    }

    remove(value: T): void {
        if (!this.root) return;
        this.root = this.root.remove(value);
    }

    // Traversal methods
    inOrderTraversal(callback: (value: T) => void): void {
        const traverse = (node: BSTNode<T> | null): void => {
            if (!node) return;
            traverse(node.left);
            callback(node.value);
            traverse(node.right);
        };
        traverse(this.root);
    }

    preOrderTraversal(callback: (value: T) => void): void {
        const traverse = (node: BSTNode<T> | null): void => {
            if (!node) return;
            callback(node.value);
            traverse(node.left);
            traverse(node.right);
        };
        traverse(this.root);
    }

    postOrderTraversal(callback: (value: T) => void): void {
        const traverse = (node: BSTNode<T> | null): void => {
            if (!node) return;
            traverse(node.left);
            traverse(node.right);
            callback(node.value);
        };
        traverse(this.root);
    }

    // Utility methods
    toArray(): T[] {
        const result: T[] = [];
        this.inOrderTraversal(value => result.push(value));
        return result;
    }

    clear(): void {
        this.root = null;
    }

    getSize(): number {
        let size = 0;
        this.inOrderTraversal(() => size++);
        return size;
    }

    getMinValue(): T | null {
        if (!this.root) return null;
        return this.root.findMin().value;
    }

    getMaxValue(): T | null {
        let current = this.root;
        if (!current) return null;
        
        while (current.right) {
            current = current.right;
        }
        return current.value;
    }

    visualize(): void {
        if (!this.root) {
            console.log("Empty tree");
            return;
        }

        const print = (node: BSTNode<T> | null, prefix: string = "", isLeft: boolean = true): void => {
            if (!node) return;
            
            console.log(prefix + (isLeft ? "├── " : "└── ") + node.value);
            print(node.left, prefix + (isLeft ? "│   " : "    "), true);
            print(node.right, prefix + (isLeft ? "│   " : "    "), false);
        };

        console.log(this.root.value);
        print(this.root.left, "", true);
        print(this.root.right, "", false);
    }
}

export default BSTree;