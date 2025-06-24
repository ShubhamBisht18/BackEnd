// import express from 'express'
// import mongoose from 'mongoose'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import foodRoutes from './routes/foodRoutes.js'

// dotenv.config({
//     path: './src/.env'
// })
// const port = process.env.PORT || 3000

// // Middelware
// const app = express();
// app.use(cors({origin: 'http://localhost:5173', credentials: true}))

// // Routes
// app.use('/api/foods',foodRoutes)

// // Mongoose Connectivity
// mongoose.connect(process.env.MONO_URI)
// .then(()=> app.listen(port,()=>{
//     console.log(`Server running at http://localhost:${port}`)
// }))
// .catch((error)=>{
//     console.log("Database not connected!!",error)
// })

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import foodRoutes from './routes/foodRoutes.js';
import dotenv from 'dotenv'
dotenv.config({
    path: './src/.env'
})

const port = process.env.PORT || 3000

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/food', foodRoutes);

mongoose.connect(process.env.MONO_URI)
.then(()=> app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
}))
.catch((error)=>{
    console.log("Database not connected!!",error)
})

