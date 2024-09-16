## Big-O Time Complexity for SinglyLinkedList

| Operation        | Time Complexity | Comments                                                                 |
|------------------|-----------------|--------------------------------------------------------------------------|
| add              | O(1)            | Adding to the front takes constant time since no traversal is needed.     |
| addLast          | O(1)            | With a tail reference, adding to the end is a constant-time operation.    |
| remove           | O(n)            | Requires traversal to find the node to remove, hence linear time.         |
| getFirst         | O(1)            | Accessing the first node is immediate with a direct reference.            |
| getLast          | O(1)            | Using the tail reference, the last node is accessible in constant time.   |
| getFirstNode     | O(1)            | The head (first node) is directly referenced, so it takes constant time.  |
| getNextNode      | O(1)            | Moving to the next node involves a simple pointer reference.              |
| getLastNode      | O(1)            | The tail node is directly referenced, so no traversal is required.        |
| getNodeWith      | O(n)            | Searching for a node requires traversing the list, resulting in O(n).     |
| removeFirstNode  | O(1)            | Removing the head involves just moving the head pointer to the next node. |
| removeLastNode   | O(1)            | With the tail reference, the last node can be removed in constant time.   |
| removeNode       | O(n)            | Finding a specific node for removal requires traversal, leading to O(n).  |
| clear            | O(1)            | Clearing the list involves resetting the head and tail pointers.          |
| size             | O(1)            | The size is maintained as a variable, so it's accessible in constant time.|
| dumpList         | O(n)            | Dumping the list involves traversing the entire list, hence O(n).         |