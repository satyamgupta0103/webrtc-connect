import express from "express";
const router = express.Router();

// const controller = require("./controller");

import { saveCallId, getCallId } from "./controller.js";

router.post("/api/save-call-id", saveCallId);
router.get("api/get-call-id/:id", getCallId);

export default router;
