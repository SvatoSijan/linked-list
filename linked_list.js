// Define Node
function Node(value) {
    this.value = value;
    this.next = null;
}

// Define the LinkedList
function LinkedList() {
    this.head = null;
    this.tail = null;
}

// Method to add a new node to the end of the list
LinkedList.prototype.append = function(value) {
    const newNode = new Node(value);
    if (!this.head) {
        this.head = newNode;
        this.tail = newNode; // Update tail for the first node
        return;
    }
    this.tail.next = newNode;
    this.tail = newNode; // Update tail to the new node
};

// Method to add a new node to the start of the list
LinkedList.prototype.prepend = function(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    if (!this.tail) {
        this.tail = newNode; // Update tail for the first node
    }
};

// Method to return the total number of nodes in the list
LinkedList.prototype.size = function() {
    let count = 0;
    let current = this.head;
    while (current !== null) {
        count++;
        current = current.next;
    }
    return count;
};

// Method to remove the last element from the list
LinkedList.prototype.pop = function() {
    if (!this.head) {
        return null; // List is empty
    }
    let current = this.head;
    let prev = null;
    while (current.next !== null) {
        prev = current;
        current = current.next;
    }

    if (prev) {
        prev.next = null; // Remove the last node
        this.tail = prev; // Update tail to the new last node
    } else {
        this.head = null; // List had only one element
        this.tail = null;
    }
    return current.value;
};

// Method to check if a value is present in the list
LinkedList.prototype.contains = function(value) {
    let current = this.head;
    while (current !== null) {
        if (current.value === value) {
            return true;
        }
        current = current.next;
    }
    return false;
};

// Method to find the index of a node containing a specific value
LinkedList.prototype.find = function(value) {
    let index = 0;
    let current = this.head;
    while (current !== null) {
        if (current.value === value) {
            return index;
        }
        current = current.next;
        index++;
    }
    return -1; // Return -1 if value not found
};

// Method to represent the LinkedList object as a string
LinkedList.prototype.toString = function() {
    let current = this.head;
    let result = "";
    while (current !== null) {
        result += `(${current.value}) -> `;
        current = current.next;
    }
    result += "null";
    return result;
};

// Method to insert a new node with the provided value at the given index
LinkedList.prototype.insertAt = function(value, index) {
    if (index < 0 || index > this.size()) {
        return false; // Index out of bounds
    }

    const newNode = new Node(value);

    if (index === 0) {
        // Inserting at the beginning
        newNode.next = this.head;
        this.head = newNode;
        if (!this.tail) {
            this.tail = newNode; // Update tail if list was empty
        }
    } else {
        let count = 0;
        let current = this.head;
        let prev = null;
        
        while (count < index) {
            prev = current;
            current = current.next;
            count++;
        }
        
        prev.next = newNode;
        newNode.next = current;
        
        if (!newNode.next) {
            this.tail = newNode; // Update tail if inserting at the end
        }
    }

    return true;
};

// Method to remove the node at the given index
LinkedList.prototype.removeAt = function(index) {
    if (index < 0 || index >= this.size()) {
        return null; // Index out of bounds
    }

    let removedNode;

    if (index === 0) {
        // Removing the head
        removedNode = this.head;
        this.head = this.head.next;
        if (!this.head) {
            this.tail = null; // Update tail if list becomes empty
        }
    } else {
        let count = 0;
        let current = this.head;
        let prev = null;

        while (count < index) {
            prev = current;
            current = current.next;
            count++;
        }

        removedNode = current;
        prev.next = current.next;

        if (!prev.next) {
            this.tail = prev; // Update tail if removing the last node
        }
    }

    return removedNode.value;
};

// Example usage:
const linkedList = new LinkedList();
linkedList.append(10);
linkedList.append(20);
linkedList.append(30);

console.log("Initial linked list:");
console.log(linkedList.toString()); // : (10) -> (20) -> (30) -> null

linkedList.prepend(90);
console.log("After prepend 90:");
console.log(linkedList.toString()); // : (90) -> (10) -> (20) -> (30) -> null

console.log("Size of linked list:", linkedList.size()); // : 4

console.log("Head of linked list:", linkedList.head); // : Node { value: 90, next: Node { value: 10, next: Node { ... } } }

console.log("Tail of linked list:", linkedList.tail); // : Node { value: 30, next: null }

linkedList.insertAt(15, 1);
console.log("After insertAt(15, 1):");
console.log(linkedList.toString()); // : (90) -> (15) -> (10) -> (20) -> (30) -> null

linkedList.removeAt(2);
console.log("After removeAt(2):");
console.log(linkedList.toString()); // : (90) -> (15) -> (20) -> (30) -> null

console.log("Size of linked list:", linkedList.size()); // : 4
