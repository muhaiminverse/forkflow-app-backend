// my code

// import express = require("express");
// import MyUserController = require("../controllers/MyUserController");
// import authMiddleware = require("../middleware/auth");
// import { validateMyUserRequest } from "../middleware/validation";

// const router = express.Router();
// router.get("/", authMiddleware.jwtCheck, authMiddleware.jwtParse, MyUserController.getCurrentUser);
// router.post("/", authMiddleware.jwtCheck, MyUserController.createCurrentUser);
// router.put("/", authMiddleware.jwtCheck, authMiddleware.jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser);

// export = router;


// gpt fix

import express = require("express");
import MyUserController from "../controllers/MyUserController"
import authMiddleware  from "../middleware/auth"
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();
router.get("/", authMiddleware.jwtCheck, authMiddleware.jwtParse, MyUserController.getCurrentUser);
router.post("/", authMiddleware.jwtCheck, authMiddleware.jwtParse, MyUserController.createCurrentUser);
router.put("/", authMiddleware.jwtCheck, authMiddleware.jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser);

export = router;