import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import { Comparable } from '../../tree/types';
import TreeNode from '../../tree/node';
import AVLTree from '../../tree/tree';
import { NumberValue } from './test.types';


describe('Node', () => {
    describe('Basic Properties', () => {
        test('should create node with value', () => {
            const node = new TreeNode(new NumberValue(5));
            expect(node.value.value).toBe(5);
            expect(node.height).toBe(1);
            expect(node.parent).toBeNull();
            expect(node.left).toBeNull();
            expect(node.right).toBeNull();
        });

        test('should calculate balance factor correctly', () => {
            const root = new TreeNode(new NumberValue(5));
            expect(root.getBalance()).toBe(0);

            root.setLeft(new TreeNode(new NumberValue(3)));
            expect(root.getBalance()).toBe(1);

            root.setRight(new TreeNode(new NumberValue(7)));
            expect(root.getBalance()).toBe(0);
        });
    });

    describe('Child Management', () => {
        test('should set children and update parent references', () => {
            const parent = new TreeNode(new NumberValue(5));
            const leftChild = new TreeNode(new NumberValue(3));
            const rightChild = new TreeNode(new NumberValue(7));

            parent.setLeft(leftChild);
            parent.setRight(rightChild);

            expect(leftChild.parent).toBe(parent);
            expect(rightChild.parent).toBe(parent);
            expect(parent.left).toBe(leftChild);
            expect(parent.right).toBe(rightChild);
        });

        test('should update height when adding children', () => {
            const root = new TreeNode(new NumberValue(5));
            expect(root.height).toBe(1);

            root.setLeft(new TreeNode(new NumberValue(3)));
            expect(root.height).toBe(2);

            root.setRight(new TreeNode(new NumberValue(7)));
            expect(root.height).toBe(2);
        });
    });

    describe('Rotations', () => {
        test('should perform left rotation', () => {
            const root = new TreeNode(new NumberValue(5));
            const right = new TreeNode(new NumberValue(7));
            const rightLeft = new TreeNode(new NumberValue(6));

            root.setRight(right);
            right.setLeft(rightLeft);

            const newRoot = root.rotateLeft();

            expect(newRoot).toBe(right);
            expect(newRoot.left).toBe(root);
            expect(root.right).toBe(rightLeft);
            expect(rightLeft?.parent).toBe(root);
            expect(root.parent).toBe(newRoot);
        });

        test('should perform right rotation', () => {
            const root = new TreeNode(new NumberValue(5));
            const left = new TreeNode(new NumberValue(3));
            const leftRight = new TreeNode(new NumberValue(4));

            root.setLeft(left);
            left.setRight(leftRight);

            const newRoot = root.rotateRight();

            expect(newRoot).toBe(left);
            expect(newRoot.right).toBe(root);
            expect(root.left).toBe(leftRight);
            expect(leftRight?.parent).toBe(root);
            expect(root.parent).toBe(newRoot);
        });
    });

    describe('Error Handling', () => {
        test('should throw error when rotating left without right child', () => {
            const node = new TreeNode(new NumberValue(5));
            expect(() => node.rotateLeft()).toThrow("Cannot rotate left without right child");
        });

        test('should throw error when rotating right without left child', () => {
            const node = new TreeNode(new NumberValue(5));
            expect(() => node.rotateRight()).toThrow("Cannot rotate right without left child");
        });
    });

    describe('Search Operations', () => {
        test('should find existing value', () => {
            const root = new TreeNode(new NumberValue(5));
            root.setLeft(new TreeNode(new NumberValue(3)));
            root.setRight(new TreeNode(new NumberValue(7)));

            const found = root.find(new NumberValue(3));
            expect(found?.value.value).toBe(3);
        });

        test('should return null for non-existent value', () => {
            const root = new TreeNode(new NumberValue(5));
            expect(root.find(new NumberValue(3))).toBeNull();
        });

        test('findMin should return leftmost node', () => {
            const root = new TreeNode(new NumberValue(5));
            const left = new TreeNode(new NumberValue(3));
            const leftLeft = new TreeNode(new NumberValue(1));
            
            root.setLeft(left);
            left.setLeft(leftLeft);

            expect(root.findMin().value.value).toBe(1);
        });
    });

    describe('Rebalancing', () => {
        test('should maintain parent references after rebalancing', () => {
            const root = new TreeNode(new NumberValue(5));
            const left = new TreeNode(new NumberValue(3));
            const leftLeft = new TreeNode(new NumberValue(1));
            
            root.setLeft(left);
            left.setLeft(leftLeft);
            
            const newRoot = root.maintain();
            expect(newRoot.value.value).toBe(3);
            expect(newRoot.parent).toBeNull();
            expect(newRoot.left?.parent).toBe(newRoot);
            expect(newRoot.right?.parent).toBe(newRoot);
        });
    });
});

describe('AVLTree', () => {
    let tree: AVLTree<NumberValue>;

    beforeEach(() => {
        tree = new AVLTree();
    });

    describe('Insertion', () => {
        test('should maintain balance through simple insertions', () => {
            [5, 3, 7].forEach(n => tree.insert(new NumberValue(n)));
            
            expect(tree.root?.value.value).toBe(5);
            expect(tree.root?.left?.value.value).toBe(3);
            expect(tree.root?.right?.value.value).toBe(7);
            expect(tree.root?.getBalance()).toBe(0);
        });

        test('should handle left-heavy case', () => {
            [5, 4, 3].forEach(n => tree.insert(new NumberValue(n)));
            
            expect(tree.root?.value.value).toBe(4);
            expect(tree.root?.left?.value.value).toBe(3);
            expect(tree.root?.right?.value.value).toBe(5);
        });

        test('should handle right-heavy case', () => {
            [3, 4, 5].forEach(n => tree.insert(new NumberValue(n)));
            
            expect(tree.root?.value.value).toBe(4);
            expect(tree.root?.left?.value.value).toBe(3);
            expect(tree.root?.right?.value.value).toBe(5);
        });

        test('should handle left-right case', () => {
            [5, 3, 4].forEach(n => tree.insert(new NumberValue(n)));
            
            expect(tree.root?.value.value).toBe(4);
            expect(tree.root?.left?.value.value).toBe(3);
            expect(tree.root?.right?.value.value).toBe(5);
        });

        test('should handle right-left case', () => {
            [3, 5, 4].forEach(n => tree.insert(new NumberValue(n)));
            
            expect(tree.root?.value.value).toBe(4);
            expect(tree.root?.left?.value.value).toBe(3);
            expect(tree.root?.right?.value.value).toBe(5);
        });
    });

    test('should maintain balance in complex sequence', () => {
        [5, 3, 7, 2, 4, 6, 8, 1, 9].forEach(n => tree.insert(new NumberValue(n)));
        
        function verifyBalance(node: TreeNode<NumberValue> | null): void {
            if (!node) return;
            
            expect(Math.abs(node.getBalance())).toBeLessThanOrEqual(1);
            verifyBalance(node.left);
            verifyBalance(node.right);
        }
        
        verifyBalance(tree.root);
    });

    describe('Remove Operation', () => {
        beforeEach(() => {
            // Setup a balanced tree for each test
            [4, 2, 6, 1, 3, 5, 7].forEach(n => tree.insert(new NumberValue(n)));
        });

        test('should remove leaf node', () => {
            tree.remove(new NumberValue(1));
            
            expect(tree.toArray().map(v => v.value)).toEqual([2, 3, 4, 5, 6, 7]);
            // Verify tree is still balanced
            function verifyBalance(node: TreeNode<NumberValue> | null): void {
                if (!node) return;
                expect(Math.abs(node.getBalance())).toBeLessThanOrEqual(1);
                verifyBalance(node.left);
                verifyBalance(node.right);
            }
            verifyBalance(tree.root);
        });

        test('should remove node with one child', () => {
            // First remove 1 to create a node with one child
            tree.remove(new NumberValue(1));
            // Then remove 2 which now has only one child
            tree.remove(new NumberValue(2));
            
            expect(tree.toArray().map(v => v.value)).toEqual([3, 4, 5, 6, 7]);
            expect(Math.abs(tree.root!.getBalance())).toBeLessThanOrEqual(1);
        });

        test('should remove node with two children', () => {
            tree.remove(new NumberValue(2));
            
            expect(tree.toArray().map(v => v.value)).toEqual([1, 3, 4, 5, 6, 7]);
            expect(Math.abs(tree.root!.getBalance())).toBeLessThanOrEqual(1);
        });

        test('should remove root node', () => {
            tree.remove(new NumberValue(4));
            
            expect(tree.toArray().map(v => v.value)).toEqual([1, 2, 3, 5, 6, 7]);
            expect(Math.abs(tree.root!.getBalance())).toBeLessThanOrEqual(1);
        });

        test('should handle removing non-existent value', () => {
            tree.remove(new NumberValue(10));
            
            expect(tree.toArray().map(v => v.value)).toEqual([1, 2, 3, 4, 5, 6, 7]);
            expect(tree.getSize()).toBe(7);
        });

        test('should maintain balance after multiple removals', () => {
            [4, 2, 6, 1].forEach(n => tree.remove(new NumberValue(n)));
            
            expect(tree.toArray().map(v => v.value)).toEqual([3, 5, 7]);
            expect(Math.abs(tree.root!.getBalance())).toBeLessThanOrEqual(1);
        });

        test('should handle removing from empty tree', () => {
            const emptyTree = new AVLTree<NumberValue>();
            emptyTree.remove(new NumberValue(1));
            expect(emptyTree.getSize()).toBe(0);
        });

        test('should handle removing last node', () => {
            const singleTree = new AVLTree<NumberValue>();
            singleTree.insert(new NumberValue(1));
            singleTree.remove(new NumberValue(1));
            
            expect(singleTree.getSize()).toBe(0);
            expect(singleTree.root).toBeNull();
        });
    });

    describe('Traversals', () => {
        beforeEach(() => {
            // Create a balanced tree:
            //       4
            //      / \
            //     2   6
            //    / \ / \
            //   1  3 5  7
            [4, 2, 6, 1, 3, 5, 7].forEach(n => tree.insert(new NumberValue(n)));
        });

        test('should perform in-order traversal', () => {
            const result: number[] = [];
            tree.inOrderTraversal(v => result.push(v.value));
            expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
        });

        test('should perform pre-order traversal', () => {
            const result: number[] = [];
            tree.preOrderTraversal(v => result.push(v.value));
            // For the given balanced tree structure
            expect(result).toEqual([4, 2, 1, 3, 6, 5, 7]);
        });

        test('should perform post-order traversal', () => {
            const result: number[] = [];
            tree.postOrderTraversal(v => result.push(v.value));
            // For the given balanced tree structure
            expect(result).toEqual([1, 3, 2, 5, 7, 6, 4]);
        });

        test('should handle empty tree traversals', () => {
            const emptyTree = new AVLTree<NumberValue>();
            const result: number[] = [];
            
            emptyTree.inOrderTraversal(v => result.push(v.value));
            expect(result).toEqual([]);
            
            emptyTree.preOrderTraversal(v => result.push(v.value));
            expect(result).toEqual([]);
            
            emptyTree.postOrderTraversal(v => result.push(v.value));
            expect(result).toEqual([]);
        });

        test('should handle single node traversals', () => {
            const singleTree = new AVLTree<NumberValue>();
            singleTree.insert(new NumberValue(1));
            
            const inOrder: number[] = [];
            const preOrder: number[] = [];
            const postOrder: number[] = [];
            
            singleTree.inOrderTraversal(v => inOrder.push(v.value));
            singleTree.preOrderTraversal(v => preOrder.push(v.value));
            singleTree.postOrderTraversal(v => postOrder.push(v.value));
            
            expect(inOrder).toEqual([1]);
            expect(preOrder).toEqual([1]);
            expect(postOrder).toEqual([1]);
        });
    });

    describe('Array Conversion', () => {
        test('should convert empty tree to empty array', () => {
            expect(tree.toArray()).toEqual([]);
        });

        test('should convert tree to sorted array', () => {
            [5, 3, 7, 1, 9, 2, 8].forEach(n => tree.insert(new NumberValue(n)));
            const result = tree.toArray();
            expect(result.map(v => v.value)).toEqual([1, 2, 3, 5, 7, 8, 9]);
        });
    });

    describe('Size and Value Bounds', () => {
        test('should track size correctly', () => {
            expect(tree.getSize()).toBe(0);
            
            tree.insert(new NumberValue(1));
            expect(tree.getSize()).toBe(1);
            
            [2, 3, 4, 5].forEach(n => tree.insert(new NumberValue(n)));
            expect(tree.getSize()).toBe(5);
            
            tree.clear();
            expect(tree.getSize()).toBe(0);
        });

        test('should find min/max values correctly', () => {
            expect(tree.getMinValue()).toBeNull();
            expect(tree.getMaxValue()).toBeNull();

            const values = [5, 3, 7, 1, 9, 2, 8];
            values.forEach(n => tree.insert(new NumberValue(n)));

            expect(tree.getMinValue()?.value).toBe(1);
            expect(tree.getMaxValue()?.value).toBe(9);
        });

        test('should handle min/max for single node', () => {
            tree.insert(new NumberValue(5));
            expect(tree.getMinValue()?.value).toBe(5);
            expect(tree.getMaxValue()?.value).toBe(5);
        });
    });

    describe('Clear Operation', () => {
        test('should clear empty tree', () => {
            tree.clear();
            expect(tree.getSize()).toBe(0);
            expect(tree.toArray()).toEqual([]);
        });

        test('should clear populated tree', () => {
            [1, 2, 3].forEach(n => tree.insert(new NumberValue(n)));
            expect(tree.getSize()).toBe(3);
            
            tree.clear();
            expect(tree.getSize()).toBe(0);
            expect(tree.toArray()).toEqual([]);
            expect(tree.getMinValue()).toBeNull();
            expect(tree.getMaxValue()).toBeNull();
        });
    });

    describe('Visualization', () => {
        test('should handle empty tree visualization', () => {
            const mockLog = jest.spyOn(console, 'log').mockImplementation(() => {});
            
            tree.visualize();
            
            expect(mockLog).toHaveBeenCalledWith('Empty tree');
            mockLog.mockRestore();
        });
    
        test('should visualize balanced tree', () => {
            const mockLog = jest.spyOn(console, 'log').mockImplementation(() => {});
            
            [4, 2, 6, 1, 3, 5, 7].forEach(n => tree.insert(new NumberValue(n)));
            tree.visualize();
    
            // Get all calls to console.log
            const calls = mockLog.mock.calls.map(call => call[0]);
            
            // Verify the overall structure without exact string matching
            expect(calls).toHaveLength(7); // Root + 6 children
            expect(calls[0]).toEqual(expect.any(NumberValue)); // Root node
            expect(calls[1]).toContain('2'); // Left subtree
            expect(calls[2]).toContain('1'); // Left-left leaf
            expect(calls[3]).toContain('3'); // Left-right leaf
            expect(calls[4]).toContain('6'); // Right subtree
            expect(calls[5]).toContain('5'); // Right-left leaf
            expect(calls[6]).toContain('7'); // Right-right leaf
            
            // Verify the tree structure pattern
            expect(calls[1]).toMatch(/├──/); // Left child marker
            expect(calls[4]).toMatch(/└──/); // Right child marker
            expect(calls[2]).toMatch(/│   ├──/); // Left-left marker
            expect(calls[3]).toMatch(/│   └──/); // Left-right marker
            expect(calls[5]).toMatch(/    ├──/); // Right-left marker
            expect(calls[6]).toMatch(/    └──/); // Right-right marker
            
            mockLog.mockRestore();
        });
    });

    describe('Tree Properties', () => {
        test('should maintain correct height', () => {
            [5, 3, 7, 2, 8].forEach(n => tree.insert(new NumberValue(n)));
            expect(tree.root?.height).toBe(3);
        });

        test('should handle duplicate values', () => {
            [5, 3, 5, 7, 3].forEach(n => tree.insert(new NumberValue(n)));
            expect(tree.toArray().map(v => v.value)).toEqual([3, 5, 7]);
        });
    });

    describe('Mixed Operations', () => {
        test('should maintain balance after mixed insertions and removals', () => {
            // Insert several nodes
            [5, 3, 7, 2, 8].forEach(n => tree.insert(new NumberValue(n)));
            // Remove some nodes
            [3, 7].forEach(n => tree.remove(new NumberValue(n)));
            // Insert more nodes
            [6, 4].forEach(n => tree.insert(new NumberValue(n)));

            function verifyBalance(node: TreeNode<NumberValue> | null): void {
                if (!node) return;
                expect(Math.abs(node.getBalance())).toBeLessThanOrEqual(1);
                expect(node.parent?.left === node || node.parent?.right === node || node.parent === null).toBeTruthy();
                verifyBalance(node.left);
                verifyBalance(node.right);
            }

            verifyBalance(tree.root);
        });
    });

    describe('Find Operation', () => {
        test('should find existing value', () => {
            [5, 3, 7, 2, 8].forEach(n => tree.insert(new NumberValue(n)));
            const found = tree.find(new NumberValue(3));
            expect(found?.value.value).toBe(3);
        });

        test('should return null for non-existent value', () => {
            [5, 3, 7].forEach(n => tree.insert(new NumberValue(n)));
            expect(tree.find(new NumberValue(4))).toBeNull();
        });

        test('should handle find in empty tree', () => {
            expect(tree.find(new NumberValue(5))).toBeNull();
        });
    });
});

// Usage Examples
describe('Usage Examples', () => {
    test('Simple number sequence', () => {
        const tree = new AVLTree<NumberValue>();
        const values = [5, 3, 7, 2, 4, 6, 8];
        
        values.forEach(n => tree.insert(new NumberValue(n)));
        // Verify the tree is balanced and contains all values
    });

    test('Custom object storage', () => {
        class Person implements Comparable<Person> {
            constructor(public name: string, public age: number) {}
            
            compareTo(other: Person): number {
                return this.age - other.age;
            }
            
            toString(): string {
                return `${this.name} (${this.age})`;
            }
        }

        const tree = new AVLTree<Person>();
        const people = [
            new Person("Alice", 25),
            new Person("Bob", 30),
            new Person("Charlie", 20),
        ];
        
        people.forEach(person => tree.insert(person));
        // Tree will be balanced by age
    });
});