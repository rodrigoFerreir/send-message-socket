import { Router } from "express";
import { AutheticateUserController } from "./controllers/AutheticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { ensureAutheticated } from "./middleware/ensureAutheticate";

const router = Router();

router.post("/autheticate", new AutheticateUserController().handle);


router.post("/messages", ensureAutheticated, new CreateMessageController().handle)

export { router }