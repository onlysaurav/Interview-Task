import express from "express"
const router = express.Router();
import * as userCtrl from "../controllers/userController.js";
router.get('/',userCtrl.getAllUsers)
router.get('/:id',userCtrl.findUsersById)
router.post('/',userCtrl.userRegistration)
export default router