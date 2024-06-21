// Node --
const createNode = (data, left = null, right = null) => ({
  data,
  left,
  right,
});

// Tree factory function --
const createTree = (array) => {
  let root = buildTree(array);

  // Build a balanced binary search tree from a sorted array
  function buildTree(array) {
    if (!array.length) return null;

    array = [...new Set(array)].sort((a, b) => a - b);  //remove duplicates from an array + sort it in ascending order

    function buildTreeRecursive(arr) {
      if (!arr.length) return null;

      const mid = Math.floor(arr.length / 2);
      const node = createNode(arr[mid]);

      node.left = buildTreeRecursive(arr.slice(0, mid));
      node.right = buildTreeRecursive(arr.slice(mid + 1));

      return node;
    }

    return buildTreeRecursive(array);
  }

  //pretty print
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  

  // Insert a value into the tree
  const insert = (value) => {
    const newNode = createNode(value);

    if (!root) {
      root = newNode;
      return;
    }

    let current = root;
    while (true) {
      if (value < current.data) {
        if (current.left === null) {
          current.left = newNode;
          break;
        } else {
          current = current.left;
        }
      } else if (value > current.data) {
        if (current.right === null) {
          current.right = newNode;
          break;
        } else {
          current = current.right;
        }
      } else {
        // Value already exists in the tree
        break;
      }
    }
  };

  // Delete a node with a given value from the tree
  const deleteItem = (value) => {
    const deleteNode = (node, value) => {
      if (node === null) {
        return null;
      }

      if (value < node.data) {
        node.left = deleteNode(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = deleteNode(node.right, value);
        return node;
      } else {
        // Node to be deleted found

        // Case 1: Node has no children (leaf node)
        if (node.left === null && node.right === null) {
          return null;
        }

        // Case 2: Node has only one child
        if (node.left === null) {
          return node.right;
        }

        if (node.right === null) {
          return node.left;
        }

        // Case 3: Node has two children
        // Find the minimum value node in the right subtree (or maximum in left subtree)
        let minRight = node.right;
        while (minRight.left !== null) {
          minRight = minRight.left;
        }

        node.data = minRight.data;
        node.right = deleteNode(node.right, minRight.data);
        return node;
      }
    };

    root = deleteNode(root, value);
  };

  // Find a node
  const find = (value) => {
    let current = root;
    while (current !== null) {
      if (value === current.data) {
        return current;
      } else if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  };


  const levelOrder = (callback = null) => {
    const queue = [];
    const result = [];

    if (root !== null) {
      queue.push(root);
    }

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.data);

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }

      if (callback) {
        callback(node);
      }
    }

    return result;
  };


  const inOrder = (callback = null) => {
    const result = [];

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      result.push(node.data);
      if (callback) callback(node);
      traverse(node.right);
    };

    traverse(root);
    return result;
  };


  const preOrder = (callback = null) => {
    const result = [];

    const traverse = (node) => {
      if (node === null) return;
      result.push(node.data);
      if (callback) callback(node);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(root);
    return result;
  };


  const postOrder = (callback = null) => {
    const result = [];

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.data);
      if (callback) callback(node);
    };

    traverse(root);
    return result;
  };


  const height = (node) => {
    if (node === null) return -1;
    return Math.max(height(node.left), height(node.right)) + 1;
  };

  // Check if the tree is balanced
  const isBalanced = () => {
    const checkHeight = (node) => {
      if (node === null) return 0;

      const leftHeight = checkHeight(node.left);
      if (leftHeight === -1) return -1;

      const rightHeight = checkHeight(node.right);
      if (rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) > 1) return -1;

      return Math.max(leftHeight, rightHeight) + 1;
    };

    return checkHeight(root) !== -1;
  };

  // Rebalance the tree
  const rebalance = () => {
    const nodes = inOrder();
    root = buildTree(nodes);
  };

  return {
    root,
    prettyPrint,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    isBalanced,
    rebalance,
  };
};

// Example usage:
const randomNumbers = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = createTree(randomNumbers);

console.log("Original tree:");
tree.prettyPrint(tree.root);

console.log("\nInserting 101:");
tree.insert(101);
console.log("Tree after insertion:");
tree.prettyPrint(tree.root);

console.log("\nDeleting 10:");
tree.deleteItem(10);
console.log("Tree after deletion:");
tree.prettyPrint(tree.root);

console.log("\nFinding node with value 50:");
const foundNode = tree.find(50);
console.log(foundNode ? `Found node with value ${foundNode.data}` : "Node not found");

console.log("\nLevel Order traversal:");
console.log(tree.levelOrder());

console.log("\nIn Order traversal:");
console.log(tree.inOrder());

console.log("\nPre Order traversal:");
console.log(tree.preOrder());

console.log("\nPost Order traversal:");
console.log(tree.postOrder());

console.log("\nHeight of the tree:");
console.log(tree.height(tree.root));

console.log("\nIs the tree balanced?");
console.log(tree.isBalanced());

console.log("\nRebalancing the tree:");
tree.rebalance();
console.log("Tree after rebalance:");
tree.prettyPrint(tree.root);

console.log("\nIs the tree balanced after rebalance?");
console.log(tree.isBalanced());
