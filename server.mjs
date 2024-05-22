import express from 'express'

const app = express()
app.use(express.json())

export const blockchain = new blockchain();

//1. flexible port number

const DEFAULT_PORT = 5001;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;
let NODE_PORT;


if (process.env.GENERATE_NODE_PORT === 'true') {
    NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
  }
  const PORT = NODE_PORT || DEFAULT_PORT;

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });