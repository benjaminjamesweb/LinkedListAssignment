class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.size++;
    }

    printForward() {
        let current = this.head;
        let str = 'null <-> ';
        while (current) {
            str += current.data + ' <-> ';
            current = current.next;
        }
        console.log(str + 'null');
    }



    merge(otherList) {
        let l1 = this.head;
        let l2 = otherList.head;

        if (!l1) {
            this.head = otherList.head;
            this.tail = otherList.tail;
            return;
        }

        if (!l2) {
            return;
        }

        let newHead;
        if (l1.data < l2.data) {
            newHead = l1;
            l1 = l1.next;
        } else {
            newHead = l2;
            l2 = l2.next;
        }

        let current = newHead;

        while (l1 && l2) {
            if (l1.data < l2.data) {
                current.next = l1;
                l1.prev = current;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2.prev = current;
                l2 = l2.next;
            }
            current = current.next;
        }

        if (l1) {
            current.next = l1;
            l1.prev = current;
            this.tail = this.tail || otherList.tail;
        } else {
            current.next = l2;
            l2.prev = current;
            this.tail = otherList.tail;
        }

        this.head = newHead;
    }

    deleteNth(n) {
        let fast = this.head;
        let slow = this.head;

        for (let i = 0; i < n; i++) {
            if (!fast) return false;
            fast = fast.next;
        }

        if (!fast) {
            this.head = this.head.next;
            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }
            this.size--;
            return true;
        }

        while (fast.next) {
            fast = fast.next;
            slow = slow.next;
        }

        slow.next = slow.next.next;
        if (slow.next) {
            slow.next.prev = slow;
        } else {
            this.tail = slow;
        }

        this.size--;
        return true;
    }
}


console.log("\nQUESTION 1\n");
const list1 = new DoublyLinkedList();
list1.append(1);
list1.append(3);
list1.append(5);
console.log("Printing list1: ");
list1.printForward()

const list2 = new DoublyLinkedList();
list2.append(2);
list2.append(4);
list2.append(6);
console.log("Printing list2: ");
list2.printForward()

list1.merge(list2);
console.log("Printing merged list: ")
list1.printForward();

console.log("\nQUESTION 2\n");

const list3 = new DoublyLinkedList();
list3.append(1);
list3.append(2);
list3.append(3);
list3.append(4);
list3.append(5);

console.log("Printing list3: ");
list3.printForward();

list3.deleteNth(2);
console.log("Printing list3 after removing the 2nd last element: ")
list3.printForward(); 
