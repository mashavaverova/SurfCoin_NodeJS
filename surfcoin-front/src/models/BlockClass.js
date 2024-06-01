import hexToBinary from 'hex-to-binary';
import { GENESIS_DATA, MINE_RATE } from '../utilities/settings.js';
//  import { createHashes }  from '../service/crypto-lib.js';
import { validateString } from '../service/validate.js';

export default class Block {
  // #validator = {validated: true, msg: []}

  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;

    // this.validateOrder()
  }
//   validateOrder(check){
     
//     const checkedData = validateString( this.data)
//     console.log(checkedData);
     

//     if(checkedData !== true){
    
//      this.#validator.validated = false,
//      this.#validator.id = this.id
//     }
//     if(typeof checkedData === 'string') {
//      this.#validator.msg.push(checkedData)
//     }
     
//  }

//  getValidation(){
//      return this.#validator
//  }
  // Getter... = property...
   

  // static mineBlock({ lastBlock, data }) {
  //   const lastHash = lastBlock.hash;    
  //   let { difficulty } = lastBlock;    
  //   let hash, timestamp;
  //   let nonce = 0;

  //    console.log('lastBlock-mineBlock_____', lastBlock);
  //    console.log('lastHash-mineBlock______', lastHash);     
  //    console.log(' data-mineBlock______', data);
  //    console.log('difficulty-nonce_______', difficulty,nonce);
  //   do {
  //     nonce++;
  //     timestamp = Date.now();
  //     difficulty = Block.adjustDifficultyLevel({ block: lastBlock, timestamp });
  //     hash =  createHashes(timestamp, lastHash, data, nonce, difficulty);
  //   } while (
  //     hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty)
  //   );
  //   console.log('mined', hash);
    

  //   return new this({
  //     timestamp,
  //     lastHash,
  //     hash,
  //     data,
  //     nonce,
  //     difficulty,
  //   });
  // }

  // static adjustDifficultyLevel({ block, timestamp }) {
  //   const { difficulty } = block;

  //   if (timestamp - block.timestamp > MINE_RATE) return difficulty - 1;

  //   return difficulty + 1;
  // }
}
