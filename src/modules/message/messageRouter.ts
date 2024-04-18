import { sendMessage } from "./messageController";
import { Router } from "express";

const router = Router();

router.post('/send',sendMessage);

export default router;
