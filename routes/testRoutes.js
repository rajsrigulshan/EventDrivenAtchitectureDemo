import { Router } from "express";
import { generateTestData } from "../controllers/testController.js";

const generateDataRouter=Router();
generateDataRouter.get('/generateTestData',generateTestData);

export default generateDataRouter;
