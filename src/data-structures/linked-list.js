/**
 * Doubly Linked List
 * Used in:
 * - List, Queue, Stack implementations
 * - great for creating circular lists
 * - can easily model real world objects such as train
 * - often used in the implementation of adjacency lists for graphs
 *
 * Note:
 * Linked List also can be implemented without the tail
 * Linked List nodes can be without a link to the next node
 */

export class LinkedListNode {
  constructor ({ data, prev, next }) {
    this.data = data;
    this.prev = prev;
    this.next = next;
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
   * Add node at the end of the list
   * Complexity: O(1)
   */
  add(data) {
    this.addLast(data);
  }

  /**
   * Add a node at the end of the list
   * Complexity: O(1)
   * If our list didn't include the tail the complexity would be O(n)
   */
  addLast(data) {
    if (this.isEmpty) {
      this[head] = this[tail] = new LinkedListNode({ data, prev: null, next: null });
    } else {
      this[tail].next = new LinkedListNode({ data, prev: this[tail], next: null });
      this[tail] = this[tail].next;
    }
    this.increaseLength();
  }

  /**
   * Add a node to the beginning of the linked list
   * Complexity: O(1)
   */
  addFirst(data) {
    if (this.isEmpty) {
      this[head] = this[tail] = new LinkedListNode({ data, prev: null, next: null });
    } else {
      this[head].prev = new LinkedListNode({ data, prev: null, next: this[head] });
      this[head] = this[head].prev;
    }
    this.increaseLength();
  }

  /**
   * Get a value of the head of the list
   * Complexity: O(1)
   */
  peekFirst() {
    if (this.isEmpty) return undefined;
    return this[head].data;
  }

  /**
   * Get a value of the tail of the list
   * Complexity: O(1)
   */
  peekLast() {
    if (this.isEmpty) return undefined;
    return this[tail].data;
  }

  /**
   * Remove the first node from the list
   * Complexity: O(1)
   */
  removeFirst() {
    if (this.isEmpty) return undefined;

    const data = this[head].data;
    this[head] = this[head].next;
    this.decreaseLength();

    if (this.isEmpty) {
      this[tail] = null;
    } else {
      this[head].prev = null;
    }

    return data;
  }

  /**
   * Remove the last node from the list
   * Complexity: O(1)
   */
  removeLast() {
    if (this.isEmpty) return undefined;

    const data = this[tail].data;
    this[tail] = this[tail].prev;
    this.decreaseLength();

    if (this.isEmpty) {
      this[head] = null;
    } else {
      this[tail].next = null;
    }

    return data;
  }

  /**
   * Remove an arbitrary node from the linked list
   * Complexity: O(1)
   */
  _remove(node) {
    if (node.prev === null) return this.removeFirst();
    if (node.next === null) return this.removeLast();

    node.next.prev = node.prev;
    node.prev.next = node.next;

    let data = node.data;
    node.data = null;
    node = node.prev = node.next = null;

    this.decreaseLength();
    return data;
  }

  /**
   * Remove a node from the list by specified index
   * Complexity: O(n)
   */
  removeAt(index) {
    if (this.isEmpty || this.indexInvalid(index)) return undefined;

    if (index === this.length - 1) {
      return this.removeLast();
    } else if (this.length === 1) {
      return this.removeFirst();
    }

    let node;
    let i;
    // Search from the front of the list
    if (index < this.length / 2) {
      for (i = 0, node = this[head]; i !== index; i += 1) {
        node = node.next;
      }
      // Search from the back of the list
    } else {
      for (i = this.length - 1, node = this[tail]; i !== index; i -= 1) {
        node = node.prev;
      }
    }

    return this._remove(node);
  }

  /**
   * Get a value from the list by specified index
   * Complexity: O(n)
   */
  get(index) {
    if (this.isEmpty || this.indexInvalid(index)) return undefined;

    // make complexity of getting the last node as O(1)
    if (index === this.length - 1) {
      return this[tail].data
    }

    if (index === 0) {
      return this[head].data;
    }

    let current = this[head];
    let i = 0;
    while (i < index) {
      current = current.next;
      i += 1;
    }
    return current.data;
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
