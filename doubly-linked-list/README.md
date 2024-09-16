## Big-O Time Complexity for DoublyLinkedList

| Operation          | Time Complexity | Comment                                                                 |
|--------------------|-----------------|-------------------------------------------------------------------------|
| `addFirst`         | O(1)            | Directly updates the head, no traversal needed.                         |
| `addLast`          | O(1)            | Directly updates the tail, no traversal needed.                         |
| `get`              | O(n)            | Traverses the list to reach the desired index.                          |
| `indexOf`          | O(n)            | Traverses the list to find the matching element.                        |
| `insertAfter`      | O(n)            | Must traverse the list to find the index before inserting.              |
| `insertBefore`     | O(n)            | Must traverse the list to find the index before inserting.              |
| `first`            | O(1)            | Directly accesses the head, no traversal needed.                        |
| `last`             | O(1)            | Directly accesses the tail, no traversal needed.                        |
| `remove`           | O(n)            | Traverses the list to find the element before removal.                  |
| `removeIndex`      | O(n)            | Traverses the list to reach the desired index before removal.           |
| `removeFirst`      | O(1)            | Directly removes the head, no traversal needed.                         |
| `removeLast`       | O(1)            | Directly removes the tail, no traversal needed.                         |
| `addNodeLast`      | O(1)            | Directly updates the tail, no traversal needed.                         |
| `addNodeFirst`     | O(1)            | Directly updates the head, no traversal needed.                         |
| `insertAfterNode`  | O(1)            | No traversal needed if the existing node is provided.                   |
| `insertBeforeNode` | O(1)            | No traversal needed if the existing node is provided.                   |
| `removeNode`       | O(1)            | Directly removes the provided node, no traversal needed.                |
| `nodeAt`           | O(n)            | Traverses the list to find the node at the specified index.             |
| `swapNodes`        | O(1)            | Swaps data between two nodes, no traversal needed.                      |
| `clear`            | O(1)            | Resets head and tail references, no traversal needed.                   |
| `size`             | O(1)            | Simply returns the size (length), which is tracked during operations.   |
| `dumpList`         | O(n)            | Traverses the list to print each element.                               |
