import express from "express";
import * as eventController from "../controllers/eventController";

const router = express.Router();

router.post("/events", eventController.createEvent);
router.put("/events/:id", eventController.editEvent);
router.delete("/events/:id", eventController.removeEvent);
router.get("/events/:id", eventController.getEvent);
router.get("/events", eventController.getAllEvents);

export default router;
