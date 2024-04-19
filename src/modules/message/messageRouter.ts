import { getAllMessages, sendMessage } from "./messageController";
import { isAdminAuthenticated } from "../../middleware/auth";
import { Router } from "express";

const router = Router();

router.post('/send',sendMessage);
router.get('/getAll',isAdminAuthenticated,getAllMessages);

export default router;
