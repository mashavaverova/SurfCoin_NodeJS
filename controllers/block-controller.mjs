import { blockchain, redisServer } from '../server.mjs';

export const mineBlock = (req, res, next) => {
  const { data }  = req.body;

  const block = blockchain.addBlock({data:data});

  //add redis broadcasting
  redisServer.broadcast();

 // console.log ("its from controller", block)

 
  res.status(201).json({
    success: true,
    statusCode: 201,
    data: { block },
  });
};


