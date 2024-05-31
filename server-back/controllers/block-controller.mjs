import { blockchain, redisServer } from '../startup.mjs';

export const mineBlock = (req, res, next) => {
  const data   = req.body;
  const block = blockchain.addBlock({data:data});

  //add redis broadcasting
  //redisServer.broadcast();

 // console.log ("its from controller", block)
  res.status(201).json({
    success: true,
    statusCode: 201,
    data: { block },
  });
};

export const getBlockByIndex = (req, res, next) => {
  const block = blockchain.getBlockByIndex(req.params.blockIndex);
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { block },
  });
};



