import express from 'express'
import { addFood, foodList } from  '../controllers/foodControllers.js'

const router = express.Router()

router.post('/addfood',addFood)
router.get('/foodlist',foodList)


export default router