// import { createHash } from '../service/crypto-lib.js';
import Block from  './BlockClass.js';

export default class Blockchain {
  constructor() {
    this.chain = [Block.genesis];
  }

  // Instance method...
  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain.at(-1),
      data: data,
    });
    this.chain.push(newBlock);
    return newBlock;
  }

   

   
    
}
