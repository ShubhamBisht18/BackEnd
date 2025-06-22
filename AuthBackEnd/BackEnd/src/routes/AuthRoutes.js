import express from 'express'
import { Register,Login,getUser } from '../controllers/userControllers.js'

const routes = express.Router()

routes.post('/register',Register)
routes.post('/login',Login)
routes.get('/user',getUser)

export default routes