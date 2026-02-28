import express from "express";
import { addManagerDataAdmin, deleteManager, getAllManager, signinAdmin, signinManager, signup, updateManagerDataAdmin } from "../controllers/adminControllers.js";

const adminRouter = express.Router();

adminRouter.get("/",getAllManager)
// unversal sigin 
// adminRouter.post("/",signin)

// sigin for admin
adminRouter.post("/siginAdmin",signinAdmin)

// siginin for manager
adminRouter.post("signinManger",signinManager)

adminRouter.post("/signup",signup)
adminRouter.put("/updateInfo",updateManagerDataAdmin)
adminRouter.post("/addManager",addManagerDataAdmin)
adminRouter.post("deleteManager/:id",deleteManager)

export default adminRouter;