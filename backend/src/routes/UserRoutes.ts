import express from "express"
import {protect} from '../middleware/auth'
import { login, logoutUser, registerUser, updateUserDetails } from "../controller/UserController"
const router=express.Router()

router.post('/signup',registerUser)
router.post('/signin',protect,login)
router.put('/update/:id',protect,updateUserDetails)
router.post('/logout',protect,logoutUser)

export default router;

