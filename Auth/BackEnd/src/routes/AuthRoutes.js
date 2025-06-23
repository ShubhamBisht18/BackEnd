import express from "express";
import { GetUser, Login, Logout, Register } from "../controllers/UserControllers.js";

const routes = express.Router();

routes.post('/register',Register)
routes.post('/login',Login)
routes.get('/user',GetUser)
routes.post('/logout',Logout)

export default routes