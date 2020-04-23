/**
 * Linked List
 * Used in:
 * - List, Queue, Stack implementations
 * - great for creating circular lists
 * - can easily model real world objects such as train
 * - often used in the implementation of adjacency lists for graphs
 *
 * Note:
 * Linked List also can be implemented without the tail
 * Double Linked List where each node has a link to the previous node
 */

export class LinkedListNode {
  constructor (data) {
    this.data = data;
    this.next = null;
  }
}

// make head unique and non-writable
const head = Symbol('head');
const tail = Symbol('tail');

export class LinkedList {
  constructor () {
    this[head] = null;
    this[tail] = null;
    this.length = 0;
  }

  // helpers
  get isEmpty() { return this.length === 0; }
  increaseLength() { this.length += 1; }
  decreaseLength() { this.length -= 1; }
  indexInvalid(index) { return (index < 0) || (index > this.length - 1); }

  /**
   * Get item from the list by specified index
   * Complexity: O(n)
   */
  get(index) {
    if (this.isEmpty || this.indexInvalid(index)) return undefined;
    let current = this[head];
    let i = 0;
    while (i < index) {
      current = current.next;
      i += 1;
    }
    return current.data;
  }

  /**
   * Add item at the end of the list
   * Complexity: O(1)
   * If our list didn't include the tail the complexity would be O(n)
   */
  add(data) {
    const newNode = new LinkedListNode(data);
    if (this.isEmpty) {
      this[head] = this[tail] = newNode;
    } else {
      this[tail].next = this[tail] = newNode;
    }
    this.increaseLength();
  }

  /**
   * Remove item from the list by specified index
   * Complexity: O(n)
   */
  removeAt(index) {
    let data = null;

    if (this.isEmpty || this.indexInvalid(index)) return undefined;

    // special case: list contains only 1 element and index is 0
    // we need to remove it and set head and tail to null
    if (index === 0 && this.length === 1) {
      data = this[head].data;
      this[head] = this[tail] = null;
    } else {
      let current = this[head];
      let previous = null;
      let i = 0;
      while (i < index) {
        previous = current;
        current = current.next;
        i += 1;
      }
      data = current.data

      if (!previous) {
        this[head] = current.next;
      } else {
        const { next } = current;
        current = null; // remove node
        previous.next = next;

        if (!next) {
          // after removing we have only one item in the list so
          // save it in both head and tail
          if (this.length === 2) {
            this[tail] = this[head];
          } else {
            // tail is equal to the previous node
            this[tail] = previous;
          }
        }
      }
    }

    this.decreaseLength();
    return data;
  }

  // realise generator to iterate over the List values
  * values() {
    let current = this[head];
    while (current !== null) {
      yield current.data;
      current = current.next;
    }
  }

  [Symbol.iterator]() {
    return this.values();
  }
}
