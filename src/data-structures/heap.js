/**
 * Binary Min Heap - is a binary tree where
 * the following conditions must be followed
 * For the min-heap:
 *  - parent <= children
 *  - min value - first item
 * For the max-heap:
 *  - parent >= children
 *  - min value - last item
 * Used in:
 *  - Priority Queues
 */

 // poll -> removeAt

class MinHeap {
  constructor() {
    this.heap = [null]; // the heap usually starts from the index 1
  }

  get length() { return this.heap.length; }
  get isEmpty() { return this.length === 1; }

  get first() { return this.heap[1]; }
  get last() { return this.heap[this.length - 1]; }

  get min() { return this.first; }
  get max() { return this.last; } // FIXME

  getParentIndex(idx) { return Math.floor(idx / 2); }
  getLeftChildIndex(idx) { return idx * 2; }
  getRightChildIndex(idx) { return idx * 2 + 1; }

  swap({ i1, i2 }) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }

  /**
   * Makes top down node sink
   * Complexity: O(log n)
   */
  sink(index) {
    let currentI = index;

    while (true) {
      const current = this.heap[currentI];

      const leftI = this.getLeftChildIndex(currentI);
      const rightI = this.getRightChildIndex(currentI);

      let smallestI = leftI;

      if (this.heap[rightI] < current) smallestI = rightI;
      if (current < this.heap[smallestI]) break;

      this.swap(currentI, smallestI);
      currentI = smallestI;
    }
  }

  /*
   * Makes bottom up node swim
   * Complexity: O(log n)
   */
  swim(index) {
    let currentI = index;
    let parentI = this.getParentIndex(currentI);

    while (this.heap[currentI] < this.heap[parentI] && currentI > 1) {
      this.swap({ i1: currentI, i2: parentI });
      currentI = parentI;
      parentI = this.getParentIndex(currentI);
    }
  }

  /*
   * Adds node to the end of the heap
   * Complexity: O(log n)
   */
  add(value) {
    this.heap.push(value);

    if (this.length >= 3) {
      this.swim(this.length - 1);
    }
  }

  /**
   * Removes node by specified index
   * Complexity: O(n)
   */
  removeAt(index) {
    if (this.isEmpty) return null;

    // make item by this index the last in the heap
    this.swap({ i1: index, i2: this.length - 1});
    // get its data and remove
    const nodeData = this.heap.pop();

    if (index === this.length - 1) {
      return nodeData;
    }

    const current = this.heap[index];
    const parent = this.heap[this.getParentIndex(index)];
    const left = this.heap[this.getLeftChildIndex(index)];
    const right = this.getRightChildIndex(index);

    const makeSwim = parent !== undefined && current < parent;
    const makeSink = (left !== undefined && current > left) || (right !== undefined && current > right);

    if (makeSwim) {
      this.swim(index);
    } else if (makeSink) {
      this.sink(index);
    }

    return nodeData;
  }

}
// [null, 1, 2, 3, 4, 5, 6, 7]
//                    1
//            2---------------3
//        4-------5--------6--------7
//      8---9--10---11--12---13--14---*
const h = new MinHeap();
h.add(1);
h.add(2);
h.add(32);
h.add(4);
h.add(5);
h.add(6);
h.add(1);
h.add(13);
h.add(11);
h.add(12);
h.add(1);
h.add(40);
h.add(3);
h.add(3);
h.add(3);
h.removeAt(5)
console.log(h.heap);

export default MinHeap;
