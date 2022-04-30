const {NotImplementedError} = require('../extensions/index.js');

const {Node} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
    constructor() {
        this.parent = null;
    }

    root() {
        return this.parent
    }

    add(data) {
        function addInsideParent(node, data) {
            if (!node) {
                return new Node(data)
            }
            if (data < node.data) {
                node.left = addInsideParent(node.left, data)
            } else {
                node.right = addInsideParent(node.right, data)
            }
            return node
        }

        this.parent = addInsideParent(this.parent, data)
    }

    has(data) {
        function searchInside(node, data) {
            if (!node) return false;
            if (node.data === data) return true;
            return node.data < data ? searchInside(node.right, data) : searchInside(node.left, data);
        }

        return searchInside(this.parent, data)
    }

    find(data) {
        function findInside(node, data) {
            if (!node) return null;
            if (node.data === data) return node;
            return node.data < data ? findInside(node.right, data) : findInside(node.left, data);
        }

        return findInside(this.parent, data)
    }

    remove(data) {
        function removeData(node, data) {
            if (!node) return null;
            if (node.data < data) {
                node.right = removeData(node.right, data)
                return node
            } else if (node.data > data) {
                node.left = removeData(node.left, data)
                return node
            } else {
                if (!node.left && !node.right) return null;
                if (!node.left) {
                    node = node.right
                    return node;
                }
                if (!node.right) {
                    node = node.left
                    return node;
                }
                let minData = node.right;
                while (minData.left) minData = minData.left
                node.data = minData.data
                node.right = removeData(node.right, minData.data)
                return node;
            }
        }

        return removeData(this.parent, data)
    }

    min() {
        let min = this.parent;
        while (min.left) min = min.left

        return min.data
    }

    max() {
        let max = this.parent;
        while (max.right)
            max = max.right

        return max.data
    }
}

module.exports = {
    BinarySearchTree
};