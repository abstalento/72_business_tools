const { createHash } = require('crypto');

class MerkleTree {
    constructor(nodes) {
        this.nodes = nodes;
        this.merkleTree = [];
        this.height = -1;
        this.targetHash = null;
    }

    hash(node) {
        return createHash('sha256').update(node).digest('hex');
    }

    buildTree(nodes) {
        if (nodes.length <= 1) {
            return nodes[0];
        }

        const next = [];

        if (nodes.length % 2 !== 0) {
            nodes.push(nodes[nodes.length - 1]);
        }

        this.merkleTree.push(nodes);

        for (let i = 0; i < nodes.length; i += 2) {
            let left = nodes[i];
            let right = nodes[i + 1];
            let hashValue = this.hash(left + right);
            next.push(hashValue);
        }

        return this.buildTree(next);
    }

    indexFinding(targetHash) {
        this.height++;
        for (let i = 0; i < this.merkleTree[this.height].length; i++) {
            if (targetHash === this.merkleTree[this.height][i]) {
                return i;
            }
        }
        return -1;
    }

    check(targetHash) {
        let index = this.indexFinding(targetHash);
        let left = 0,
            right = 0,
            hashNod = 0;

        if (index !== -1) {
            if (this.height === this.merkleTree.length) {
                return "NO";
            }

            if (index % 2 === 0) {
                left = this.merkleTree[this.height][index];
                right = this.merkleTree[this.height][index + 1];
            } else {
                left = this.merkleTree[this.height][index - 1];
                right = this.merkleTree[this.height][index];
            }

            hashNod = this.hash(left + right);

            if (hashNod === this.merkle) {
                return "Valid";
            }
        } else {
            return "Not Valid";
        }

        return this.check(hashNod);
    }

    build() {
        const hashNodes = this.nodes.map(val => this.hash(val));
        this.merkle = this.buildTree(hashNodes);
        this.merkleTree.push(this.merkle);
    }

    validate(target) {
        this.targetHash = this.hash(target);
        return this.check(this.targetHash);
    }
}

// Example usage:
const nodes = ['data1', 'data2', 'data3', 'data4', 'data5'];
const merkleTree = new MerkleTree(nodes);
merkleTree.build();
const target = 'data4';
const valid = merkleTree.validate(target);
console.log(valid);