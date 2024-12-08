import { Comparable } from './types.js';
import TreeNode from './AVLTreeNode.js';

class AVLTree<T extends Comparable<T>> {
    root: TreeNode<T> | null = null;

    insert(value: T): void {
        if (!this.root) {
            this.root = new TreeNode(value);
        } else {
            this.root = this.root.insert(value);
        }
    }

    find(value: T): TreeNode<T> | null {
        return this.root?.find(value) ?? null;
    }

    remove(value: T): void {
        if (!this.root) return;
        this.root = this.root.remove(value);
    }

    inOrderTraversal(callback: (value: T) => void): void {
        const traverse = (node: TreeNode<T> | null): void => {
            if (!node) return;
            traverse(node.left);
            callback(node.value);
            traverse(node.right);
        };
        traverse(this.root);
    }

    preOrderTraversal(callback: (value: T) => void): void {
        const traverse = (node: TreeNode<T> | null): void => {
            if (!node) return;
            callback(node.value);
            traverse(node.left);
            traverse(node.right);
        };
        traverse(this.root);
    }
    
    postOrderTraversal(callback: (value: T) => void): void {
        const traverse = (node: TreeNode<T> | null): void => {
            if (!node) return;
            traverse(node.left);
            traverse(node.right);
            callback(node.value);
        };
        traverse(this.root);
    }

    toArray(): T[] {
        const result: T[] = [];
        this.inOrderTraversal(value => result.push(value));
        return result;
    }

    clear(): void {
        this.root = null;
    }

    visualize(): void {
        if (!this.root) {
            console.log("Empty tree");
            return;
        }

        const print = (node: TreeNode<T> | null, prefix: string = "", isLeft: boolean = true): void => {
            if (!node) return;
            
            console.log(prefix + (isLeft ? "├── " : "└── ") + node.value);
            print(node.left, prefix + (isLeft ? "│   " : "    "), true);
            print(node.right, prefix + (isLeft ? "│   " : "    "), false);
        };

        console.log(this.root.value);
        print(this.root.left, "", true);
        print(this.root.right, "", false);
    }

    getSize(): number {
        let size = 0;
        this.inOrderTraversal(() => size++);
        return size;
    }

    getMinValue(): T | null {
        let current = this.root;
        if (!current) return null;
        
        while (current.left) {
            current = current.left;
        }
        return current.value;
    }

    getMaxValue(): T | null {
        let current = this.root;
        if (!current) return null;
        
        while (current.right) {
            current = current.right;
        }
        return current.value;
    }
}

export default AVLTree;