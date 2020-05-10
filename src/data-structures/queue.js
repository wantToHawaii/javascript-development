/**
 * Queue (FIFO - first in first out)
 * Used in:
 * - any waiting line models a queue (a lineup at a movie theatre)
 * - efficiently keep track of the X most recently added elements
 * - we server requests management where you want first come first serve
 * - breadth-first search (BFS) graph traversal
 */

// TODO: Realise Priority Queue

import { LinkedList } from './linked-list';

class Queue {
  constructor() {
    this.list = new LinkedList();
  }

  /**
   * Returns the size of the queue
   */
  get length() {
    return this.list.length;
  }

  /**
   * Add node at the end of the queue
   * Complexity: O(1)
   */
  enqueue(data) {
    this.list.addLast(data);
  }

  /**
   * Remove node from the front of the queue (removing, polling)
   * Complexity: O(1)
   */
  dequeue() {
    return this.list.removeFirst();
  }

  /**
   * Get a value from the front of the queue
   * Complexity: O(1)
   */
  peek() {
    return this.list.peekFirst();
  }

  /**
   * Checking if a value within the queue
   * Complexity: O(n)
   */
  contains() {}

  /**
   * Remove a node from the queue
   * Complexity: O(n)
   */
  remove() {}

  // realise generator to iterate over the List values
  [Symbol.iterator]() {
    return this.list.values();
  }
}

export default Queue;
