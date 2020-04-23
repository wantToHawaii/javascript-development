/**
 * Stack
 * Used in:
 * - undo mechanisms in text editors
 * - in compiler syntax checking for matching brackets and braces
 *  - e.g. model a pile of books or plates
 */

import { LinkedList } from './linked-list';

class Stack {
  constructor() {
    this.list = new LinkedList();
  }

  // add to the end of a stack
  push(data) {
    this.list.add(data);
  }

  // remove from the end of a stack
  pop() {
    return this.list.removeAt(this.list.length - 1);
  }

  // return last item from a stack without removing
  peek() {
    return this.list.get(this.list.length - 1);
  }

  [Symbol.iterator]() {
    return this.list.values();
  }
}

export default Stack;
