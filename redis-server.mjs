import redis from 'redis';

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
};

// redis server for broadcasting blockchain to clients 
export default class RedisServer {
  constructor({ blockchain }) {
    this.blockchain = blockchain;
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.loadChannels();

    this.subscriber.on('message', (channel, message) =>
      this.messageHandler(channel, message)
    );
  }

  //broadcast blockchain 
  broadcast() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  //helper functions
  //1. load channels to subscribe to messages from the redis server
  loadChannels() {
    Object.values(CHANNELS).forEach((channel) =>
      this.subscriber.subscribe(channel)
    );
  }

  //2. message handler for the redis server
  messageHandler(channel, message) {
    const parsedMessage = JSON.parse(message);

    if (channel === CHANNELS.BLOCKCHAIN) {
      console.log('REPLACE IS IN PROGRESS', parsedMessage);
      this.blockchain.replaceChain(parsedMessage);
    }
  }

  //3. send message to redis server
  publish({ channel, message }) {
    this.publisher.publish(channel, message);
  }
}
