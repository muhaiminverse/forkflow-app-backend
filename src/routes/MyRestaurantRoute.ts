import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import authMiddleware = require("../middleware/auth");
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});


router.get("/", authMiddleware.jwtCheck, authMiddleware.jwtParse, MyRestaurantController.getMyRestaurant);
router.post("/", upload.single("imageFile"), validateMyRestaurantRequest, authMiddleware.jwtCheck, authMiddleware.jwtParse, MyRestaurantController.createMyRestaurant);
router.put("/", upload.single("imageFile"), validateMyRestaurantRequest, authMiddleware.jwtCheck, authMiddleware.jwtParse, MyRestaurantController.updateMyRestaurant);


export default router;