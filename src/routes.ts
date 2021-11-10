import { Router } from "express";
import { AutheticateUserController } from "./controllers/AutheticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { Get3LastMessagesController } from "./controllers/GetLast3MessagesController";
import { ensureAutheticated } from "./middleware/ensureAutheticate";

const router = Router();

router.post("/autheticate", new AutheticateUserController().handle);


router.post("/messages", ensureAutheticated, new CreateMessageController().handle);
router.get("/messages/last3", new Get3LastMessagesController().handle);

export { router }