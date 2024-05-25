import express from 'express';
import Blockchain from './models/Blockchain.mjs';
import RedisServer from './redis-server.mjs';
import blockchainRouter from './routes/blockchain-routes.mjs';
import blockRouter from './routes/block-routes.mjs';

//export blockchain to be used in other files in the project (controllers)
export const blockchain = new Blockchain();
//export redis server to be used in other files in the project (redis-server)
export const redisServer = new RedisServer({ blockchain: blockchain });

const app = express();
app.use(express.json());

//1. flexible port number p.1
const DEFAULT_PORT = 5001;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;
let NODE_PORT;

// 3. block and blockchain routes
app.use('/api/v1/block', blockRouter);
app.use('/api/v1/blockchain', blockchainRouter);

//2. flexible port number p.2
if (process.env.GENERATE_NODE_PORT === 'true') {
  NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const PORT = NODE_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
