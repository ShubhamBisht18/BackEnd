import express from 'express'
import jwt from 'jsonwebtoken'
import Quiz from '../modules/quizModle.js'

const addQuiz = async (req, res) => {
    try {
        const {questions, options} = req.body;
        if(!questions|| !options){
            return res.status(400).json({message: "Empty Fields!!!"})
        }
        const quiz = new Quiz({questions, options})
        await quiz.save()

        const token = jwt.sign({id: quiz._id},process.env.JWT_SECRET)

        res.cookie('token',token,{
            httpO
        })
    } catch (error) {
        
    }
}
// const getQuiz = async(req, res) =>{
//     try {
//         const token = req.cookies.token
//     } catch (error) {
        
//     }
// }