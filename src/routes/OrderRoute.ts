import express from "express";
import authMiddleware = require("../middleware/auth");
import OrderController from "../controllers/OrderController";

const router = express.Router();

router.get("/",authMiddleware.jwtCheck,authMiddleware.jwtParse, OrderController.getMyOrders);

router.post("/checkout/create-checkout-session",authMiddleware.jwtCheck,authMiddleware.jwtParse,OrderController.createCheckoutSession);

router.post("/checkout/webhook", OrderController.stripeWebhookHandler);

export default router;