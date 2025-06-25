import express from "express";
import Food from '../models/foodModels.js'

export const addFood = async(req, res) => {
    const {name, image, price} = req.body;
    if(!name || !image || !price){
        return res.status(400).json({ message: "All fields are required!" });
    }
    try {
        const food = new Food({name,image,price})
        await food.save()
        res.status(201).json({ message: "Food is saved!" });
    } catch (error) {
        console.error("Food is not saved!", error);
        res.status(500).json({ message: "Server error while saving food." });
    }
}

export const foodList = async(req,res) => {
    try {
        const food = await Food.find()
        res.status(200).json({
        message: "Food fetched successfully!",
        data: food
        });
    } catch (error) {
        console.error("Failed to fetch food list!", error);
        res.status(500).json({ message: "Server error while fetching food." });
    }
}