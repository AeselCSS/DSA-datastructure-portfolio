import { Comparable } from "./types.js";

class TreeNode<T extends Comparable<T>> {
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;
    parent: TreeNode<T> | null = null;
    height: number = 1;

    constructor(public value: T) {}

    // Height and Balance
    private static getHeight<T extends Comparable<T>>(node: TreeNode<T> | null): number {
        return node ? node.height : 0;
    }

    getBalance(): number {
        return TreeNode.getHeight(this.left) - TreeNode.getHeight(this.right);
    }

    updateHeight(): void {
        this.height = Math.max(TreeNode.getHeight(this.left), TreeNode.getHeight(this.right)) + 1;
    }

    // Child management
    setLeft(node: TreeNode<T> | null): void {
        if (this.left === node) return;
        
        // Clear old parent reference
        if (this.left) {
            this.left.parent = null;
        }
        
        // Set new child and update its parent
        this.left = node;
        if (node) {
            node.parent = this;
        }
        
        this.updateHeight();
    }

    setRight(node: TreeNode<T> | null): void {
        if (this.right === node) return;
        
        // Clear old parent reference
        if (this.right) {
            this.right.parent = null;
        }
        
        // Set new child and update its parent
        this.right = node;
        if (node) {
            node.parent = this;
        }
        
        this.updateHeight();
    }

    // Rotation & Balance Maintenance
    rotateLeft(): TreeNode<T> {
        if (!this.right) throw new Error("Cannot rotate left without right child");
        
        const newRoot = this.right;
        const newRootLeft = newRoot.left;
        
        // Update parent relationships
        newRoot.parent = this.parent;
        this.parent = newRoot;
        
        // Move newRoot's left child to be this node's right child
        this.right = newRootLeft;
        if (newRootLeft) {
            newRootLeft.parent = this;
        }
        
        // Make this node the left child of newRoot
        newRoot.left = this;
        
        // Update heights
        this.updateHeight();
        newRoot.updateHeight();
        
        return newRoot;
    }

    rotateRight(): TreeNode<T> {
        if (!this.left) throw new Error("Cannot rotate right without left child");
        
        const newRoot = this.left;
        const newRootRight = newRoot.right;
        
        // Update parent relationships
        newRoot.parent = this.parent;
        this.parent = newRoot;
        
        // Move newRoot's right child to be this node's left child
        this.left = newRootRight;
        if (newRootRight) {
            newRootRight.parent = this;
        }
        
        // Make this node the right child of newRoot
        newRoot.right = this;
        
        // Update heights
        this.updateHeight();
        newRoot.updateHeight();
        
        return newRoot;
    }

    maintain(): TreeNode<T> {
        this.updateHeight();
        const balance = this.getBalance();

        // Left heavy
        if (balance > 1 && this.left) {
            if (this.left.getBalance() < 0) {
                // Left-Right case
                this.setLeft(this.left.rotateLeft());
            }
            return this.rotateRight();
        }

        // Right heavy
        if (balance < -1 && this.right) {
            if (this.right.getBalance() > 0) {
                // Right-Left case
                this.setRight(this.right.rotateRight());
            }
            return this.rotateLeft();
        }

        return this;
    }

    private rebalanceToRoot(): void {
        let current: TreeNode<T> | null = this;
        while (current) {
            current.maintain();
            current = current.parent;
        }
    }

    // Tree operations (insert, find, remove)
    insert(value: T): TreeNode<T> {
        const comparison = value.compareTo(this.value);
        
        if (comparison < 0) {
            if (!this.left) {
                this.setLeft(new TreeNode(value));
            } else {
                this.setLeft(this.left.insert(value));
            }
        } else if (comparison > 0) {
            if (!this.right) {
                this.setRight(new TreeNode(value));
            } else {
                this.setRight(this.right.insert(value));
            }
        }
        
        return this.maintain();
    }

    find(value: T): TreeNode<T> | null {
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
    
    removeNode(): TreeNode<T> | null {
        // Case 1: Leaf node
        if (!this.left && !this.right) {
            return null;
        }
        
        // Case 2: One child
        if (!this.left) return this.right;
        if (!this.right) return this.left;
        
        // Case 3: Two children
        // Find successor (smallest value in right subtree)
        const successor = this.right.findMin();
        
        // Important: First remove the successor from its current position
        // We need to keep a reference to the original parent before any modifications
        const successorParent = successor.parent;
        const successorRight = successor.right;
        
        if (successorParent !== this) {
            // Successor is not the immediate right child
            successorParent!.setLeft(successorRight);
            successor.setRight(this.right);
        }
        
        // Move left child to successor
        successor.setLeft(this.left);
        
        // Clear this node's connections
        this.left = null;
        this.right = null;
        
        return successor;
    }

    remove(value: T): TreeNode<T> | null {
        // First, find the node
        const nodeToRemove = this.find(value);
        if (!nodeToRemove) {
            return this;
        }
        
        // Keep track of parent before removal
        const parent = nodeToRemove.parent;
        
        // Determine which child this node is
        let isLeftChild = false;
        if (parent) {
            isLeftChild = parent.left === nodeToRemove;
        }
        
        // Remove the node
        const replacementNode = nodeToRemove.removeNode();
        
        // Update parent's reference
        if (parent) {
            if (isLeftChild) {
                parent.setLeft(replacementNode);
            } else {
                parent.setRight(replacementNode);
            }
            // Rebalance from parent up to root
            parent.rebalanceToRoot();
            return this;
        } else {
            // If no parent, this was the root
            return replacementNode;
        }
    }
}

export default TreeNode;