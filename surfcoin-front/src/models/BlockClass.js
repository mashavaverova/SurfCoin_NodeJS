 
import { GENESIS_DATA, MINE_RATE } from '../utilities/settings.js';
import { validateString } from '../service/validate.js';

export default class Block {
  // #validator = {validated: true, msg: []}

  constructor({ timestamp, lastHash, hash, data,transactions,  nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.transactions= transactions;
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
  
   
 
}
