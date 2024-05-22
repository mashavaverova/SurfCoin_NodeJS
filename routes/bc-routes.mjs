import express from "express";
import {listBlocks}from "../controllers/blockchain-controller.mjs";

const router = express.Router();

router.route ('/').get(listBlocks);

export default router