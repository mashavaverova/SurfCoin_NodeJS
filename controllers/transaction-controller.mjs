import { blockchain } from '../server.mjs';
import { redisServer } from '../server.mjs';

export const createTransaction = (req, res, next) => {
  const { amount, sender, recipient } = req.body;

  if (!amount || !sender || !recipient) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Missing transaction fields',
    });
  }

  const transaction = blockchain.createTransaction(amount, sender, recipient);
  const blockIndex = blockchain.addTransaction(transaction);

  redisServer.publish({
    channel: 'transactions',
    message: JSON.stringify(transaction),
  });

  res.status(201).json({
    success: true,
    statusCode: 201,
    data: { message: 'Transaction created', transaction, blockIndex },
  });
};

export const broadcastTransaction = (req, res, next) => {
  const transaction = blockchain.createTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipient
  );

  const blockIndex = blockchain.addTransaction(transaction);

  redisServer.publish({
    channel: 'transactions',
    message: JSON.stringify(transaction),
  });

  res.status(201).json({
    success: true,
    statusCode: 201,
    data: {
      message: 'Transaction created and broadcasted',
      transaction,
      blockIndex,
    },
  });
};
