import { Comparable } from './types.js';

class BSTNode<T extends Comparable<T>> {
    left: BSTNode<T> | null = null;
    right: BSTNode<T> | null = null;
    parent: BSTNode<T> | null = null;

    constructor(public value: T) {}

    // Child management
    setLeft(node: BSTNode<T> | null): void {
        if (this.left === node) return;
        
        if (this.left) {
            this.left.parent = null;
        }
        
        this.left = node;
        if (node) {
            node.parent = this;
        }
    }

    setRight(node: BSTNode<T> | null): void {
        if (this.right === node) return;
        
        if (this.right) {
            this.right.parent = null;
        }
        
        this.right = node;
        if (node) {
            node.parent = this;
        }
    }

    // Search operations
    find(value: T): BSTNode<T> | null {
        const comparison = value.compareTo(this.value);
        
        if (comparison === 0) {
            return this;
        }
        
        if (comparison < 0 && this.left) {
            return this.left.find(value);
        }
        
        if (comparison > 0 && this.right) {
            return this.right.find(value);
        }
        
        return null;
    }

    findMin(): this {
        let current: this = this;
        while (current.left) {
            current = current.left as this;
        }
        return current;
    }

    // BST operations
    insert(value: T): BSTNode<T> {
        const comparison = value.compareTo(this.value);
        
        if (comparison < 0) {
            if (!this.left) {
                this.setLeft(new BSTNode(value));
            } else {
                this.setLeft(this.left.insert(value));
            }
        } else if (comparison > 0) {
            if (!this.right) {
                this.setRight(new BSTNode(value));
            } else {
                this.setRight(this.right.insert(value));
            }
        }
        
        return this;
    }

    removeNode(): BSTNode<T> | null {
        // Case 1: Leaf node
        if (!this.left && !this.right) {
            return null;
        }
        
        // Case 2: One child
        if (!this.left) return this.right;
        if (!this.right) return this.left;
        
        // Case 3: Two children
        const successor = this.right.findMin();
        this.value = successor.value;
        this.setRight(this.right.remove(successor.value));
        
        return this;
    }

    remove(value: T): BSTNode<T> | null {
        const nodeToRemove = this.find(value);
        if (!nodeToRemove) {
            return this;
        }
        
        const parent = nodeToRemove.parent;
        const isLeftChild = parent?.left === nodeToRemove;
        
        const replacementNode = nodeToRemove.removeNode();
        
        if (parent) {
            if (isLeftChild) {
                parent.setLeft(replacementNode);
            } else {
                parent.setRight(replacementNode);
            }
            return this;
        } else {
            return replacementNode;
        }
    }
}

export default BSTNode;