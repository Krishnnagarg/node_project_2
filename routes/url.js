import express from "express";
import { URL } from "../models/url";
import { handleGenerateNewShortURL } from "../controllers/url";

const router = express.Router();

router.post("/" , handleGenerateNewShortURL);

export {router};