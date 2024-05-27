import Block from '../models/Block.mjs';
import { createHash } from '../utilities/crypto-lib.mjs';
export default class Blockchain {
  constructor() {
    this.chain = [Block.genesis];
    this.memberNodes = [];
    this.nodeUrl = '';
    
  }
  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain.at(-1),
      data: data,
    });

    this.chain.push(newBlock);
    return newBlock;
  }


  replaceChain(chain) {
    if (chain.length <= this.chain.length) return;
    if (!Blockchain.validateChain(chain)) return;
    this.chain = chain;
  }


  static validateChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis)) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, data, difficulty, nonce } = chain[i];
      const actualLastHash = chain[i - 1].hash;
      const lastDifficulty = chain[i - 1].difficulty;

      if (lastHash !== actualLastHash) return false;
      if (Math.abs(lastDifficulty - difficulty) > 1) return false;
      const validHash = createHash(
        timestamp,
        lastHash,
        data,
        difficulty,
        nonce
      );
      if (hash !== validHash) return false;
    }

    return true;
  }

  addNode(nodeUrl) {
    if (nodeUrl && nodeUrl !== this.nodeUrl && !this.memberNodes.includes(nodeUrl)) {
      this.memberNodes.push(nodeUrl);
    }
  }

  removeNode(nodeUrl) {
    this.memberNodes = this.memberNodes.filter(node => node !== nodeUrl);
  }

  getMemberNodes() {
    return this.memberNodes;
  }
}
