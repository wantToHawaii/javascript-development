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

class MinHeap {
  constructor() {
    this.heap = [null]; // the heap usually starts from the index 1
  }

  get length() { return this.heap.length; }
  get isEmpty() { return this.length === 1; }

  get firstNode() { return this.heap[1]; }
  get lastNode() { return this.heap[this.length - 1]; }

  get min() { return this.firstNode; }
  get max() { return this.lastNode; }

  getParentIndex(idx) { return Math.floor(idx / 2); }
  getLeftChildIndex(idx) { return idx * 2; }
  getRightChildIndex(idx) { return idx * 2 + 1; }

  swapNodes({ i1, i2 }) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }

  bubbleUp() {
    let currentI = this.length - 1;
    let parentI = this.getParentIndex(currentI);

    while (this.heap[currentI] < this.heap[parentI] && currentI > 1) {
      this.swapNodes({ i1: currentI, i2: parentI });
      currentI = parentI;
      parentI = this.getParentIndex(currentI);
    }
  }

  insert(value) {
    this.heap.push(value);

    if (this.length >= 3) {
      this.bubbleUp();
    }
  }
}
// [null, 1, 2, 3, 4, 5, 6, 7]
//                    1
//            2---------------3
//        4-------5--------6--------7
//      8---9--10---11--12---13--14---*
const h = new MinHeap();
h.insert(1);
h.insert(2);
h.insert(32);
h.insert(4);
h.insert(5);
h.insert(6);
h.insert(1);
h.insert(13);
h.insert(11);
h.insert(12);
h.insert(1);
h.insert(40);
h.insert(3);
h.insert(3);
h.insert(3);
console.log(h.heap);

export default MinHeap;
