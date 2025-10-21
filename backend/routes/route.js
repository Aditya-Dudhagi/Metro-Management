import { Router } from "express";
import { bookTicket, getUserTickets } from "../controllers/ticketController.js";
import { registerUser, loginUser } from "../controllers/userController.js";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/tickets/book", bookTicket);
router.get("/tickets/user/:userId", getUserTickets);

export default router;
