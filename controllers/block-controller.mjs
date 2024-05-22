import { blockchain } from '../server.mjs';

export const mineBlock = (req, res, next) => {
  const data = req.body;

  const block = blockchain.addBlock({data:data});

  res.status(201).json({
    success: true,
    statusCode: 201,
    data: { block },
  });
};


//! add redis broadcasting