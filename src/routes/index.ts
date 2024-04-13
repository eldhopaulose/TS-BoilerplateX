import Express from "express";
import indexController from "../controller/indexController";

const router = Express.Router();

router.get("/", indexController.indexController);

export default router;
