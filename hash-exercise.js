// factory function to create a HashMap
function HashMap(initialCapacity = 8, loadFactor = 0.75) {
  let containers = new Array(initialCapacity); // Initialize containers
  let size = 0; // Initialize size

  //convert key to a hash code
  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % containers.length;
    }
    return hashCode;
  }

  // resize function to handle dynamic resizing
  function resize() {
    const oldContainers = containers;
    containers = new Array(oldContainers.length * 2);
    size = 0;

    // Rehash all items
    for (const container of oldContainers) {
      if (container) {
        for (const [key, value] of container) {
          set(key, value);
        }
      }
    }
  }

  // set function to add or update key-value pairs
  function set(key, value) {
    const index = hash(key);
    if (!containers[index]) {
      containers[index] = [];
    }

    // Check if key exists and update value
    for (const pair of containers[index]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    containers[index].push([key, value]);
    size++;

    // Resizeee
    if (size / containers.length > loadFactor) {
      resize();
    }
  }

  // Get function to retrieve value by key
  function get(key) {
    const index = hash(key);
    const container = containers[index];
    if (container) {
      for (const [k, v] of container) {
        if (k === key) {
          return v;
        }
      }
    }
    return null;
  }

  // Has function to check if a key exists
  function has(key) {
    const index = hash(key);
    const container = containers[index];
    if (container) {
      for (const [k, v] of container) {
        if (k === key) {
          return true;
        }
      }
    }
    return false;
  }

  // Remove function to delete a key-value pair
  function remove(key) {
    const index = hash(key);
    const container = containers[index];
    if (container) {
      for (let i = 0; i < container.length; i++) {
        if (container[i][0] === key) {
          container.splice(i, 1);
          size--;
          return true;
        }
      }
    }
    return false;
  }

  // Length function to get the number of stored keys
  function length() {
    return size;
  }

  // clear function to remove all entries
  function clear() {
    containers = new Array(containers.length);
    size = 0;
  }

  // keys function to return an array of all keys
  function keys() {
    const result = [];
    for (const container of containers) {
      if (container) {
        for (const [key] of container) {
          result.push(key);
        }
      }
    }
    return result;
  }

  // values function to return an array of all values
  function values() {
    const result = [];
    for (const container of containers) {
      if (container) {
        for (const [, value] of container) {
          result.push(value);
        }
      }
    }
    return result;
  }

  // Entries function to return an array of key-value pairs
  function entries() {
    const result = [];
    for (const container of containers) {
      if (container) {
        for (const [key, value] of container) {
          result.push([key, value]);
        }
      }
    }
    return result;
  }

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries
  };
}

// Extra Credit: HashSet implementation
function HashSet(initialCapacity = 16, loadFactor = 0.78) {
  const h_map = HashMap(initialCapacity, loadFactor);

  // Add function to add a key
  function add(key) {
    h_map.set(key, true);
  }

  // Has function to check if a key exists
  function has(key) {
    return h_map.has(key);
  }

  // Remove function to delete a key
  function remove(key) {
    return h_map.remove(key);
  }

  // Length function to get the number of stored keys
  function length() {
    return h_map.length();
  }

  // Clear function to remove all entries
  function clear() {
    h_map.clear();
  }

  // Keys function to return an array of all keys
  function keys() {
    return h_map.keys();
  }

  return {
    add,
    has,
    remove,
    length,
    clear,
    keys
  };
}
