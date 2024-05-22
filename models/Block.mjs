import { GENESIS_DATA, MINE_RATE } from '../config/settings.mjs';
import { createHash } from '../utilities/crypto-lib.mjs';
import hexToBinary from 'hex-to-binary';

export default class Block {
  constructor({ timestamp, lastHash, hash, data, difficulty, nonce }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }

  static get genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    let { difficulty } = lastBlock;
    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficultyLevel({
        block: lastBlock,
        timestamp,
      });
      hash = createHash(timestamp, lastHash, data, difficulty, nonce);
    } while (
      hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty)
    );

    return new this({
      timestamp,
      lastHash,
      hash,
      data,
      difficulty,
      nonce,
    });
  }

  static adjustDifficultyLevel({ block, timestamp }) {
    const { difficulty } = block;
    // console.log(timestamp - block.timestamp);
    if (timestamp - block.timestamp > MINE_RATE) return difficulty - 1;
    return difficulty + 1;
  }
}
