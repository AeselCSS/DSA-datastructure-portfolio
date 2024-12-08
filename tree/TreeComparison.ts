import AVLTree from './AVLTree.js';
import BSTree from './BSTree.js';
import { NumberValue } from '../tests/tree/test.types.js';

function compareTreeStructures() {
    const bst = new BSTree<NumberValue>();
    const avl = new AVLTree<NumberValue>();

    console.log("Inserting ordered sequence: 1, 2, 3, 4, 5\n");

    // Insert ordered sequence
    [1, 2, 3, 4, 5].forEach(n => {
        const value = new NumberValue(n);
        bst.insert(value);
        avl.insert(value);
    });

    console.log("BST Structure (potentially unbalanced):");
    bst.visualize();

    console.log("\nAVL Structure (automatically balanced):");
    avl.visualize();
}

compareTreeStructures();