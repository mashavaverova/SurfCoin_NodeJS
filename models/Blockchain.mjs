import Block from '../models/Block.mjs';
import { createHash } from '../utilities/crypto-lib.mjs';
import Transaction from './Transaction.mjs';
export default class Blockchain {
  constructor() {
    this.chain = [Block.genesis];
    this.memberNodes = [];
    this.pendingTransactions = [];
    this.nodeUrl = '';
    
  }
  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain.at(-1),
      data,
      transactions: this.pendingTransactions,
    });

    this.chain.push(newBlock);
    this.pendingTransactions = [];
    return newBlock;
  }


  createTransaction(amount, sender, recipient) {
    return new Transaction(amount, sender, recipient);
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
    return this.getLastBlock().blockIndex + 1;

  }
  getLastBlock() {
    return this.chain.at(-1);
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
      const { timestamp, lastHash, hash, data, transactions, difficulty, nonce } = chain[i];
      const actualLastHash = chain[i - 1].hash;
      const lastDifficulty = chain[i - 1].difficulty;

      if (lastHash !== actualLastHash) return false;
      if (Math.abs(lastDifficulty - difficulty) > 1) return false;
      const validHash = createHash(
        timestamp,
        lastHash,
        data,
        transactions,
        difficulty,
        nonce
      );
      if (hash !== validHash) return false;
    }

    return true;
  }
}
