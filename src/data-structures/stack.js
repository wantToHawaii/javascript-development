/**
 * Stack (LIFO - last in first out)
 * Used in:
 * - undo mechanisms in text editors
 * - in compiler syntax checking for matching brackets and braces
 * - e.g. model a pile of books or plates
 */

import { LinkedList } from './linked-list';

class Stack {
  constructor() {
    this.list = new LinkedList();
  }

  /**
   * Add at the end of the stack
   * Complexity: O(1)
   */
  push(data) {
    this.list.add(data);
  }

  /**
   * Remove from the end of the stack
   * Complexity: O(1)
   */
  pop() {
    return this.list.removeLast();
  }

  /**
   * Return last node from the stack without removing
   * Complexity: O(1)
   */
  peek() {
    return this.list.peekLast();
  }

  [Symbol.iterator]() {
    return this.list.values();
  }
}

export default Stack;
