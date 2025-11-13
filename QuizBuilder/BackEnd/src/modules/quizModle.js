import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({

    questions: 
    {
        type: String,
        required: true
    },
    options:
    [
        {
            type: String,
            required: true
        }
    ]
},{timestamps: true})

export default mongoose.model('Quiz',quizSchema)