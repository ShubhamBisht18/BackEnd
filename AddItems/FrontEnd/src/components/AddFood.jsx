import React from "react";
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import instance from "../axios";

function AddFood(){
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const onsubmit = async(data) =>{
        try {
            await instance.post('/api/food/addfood',data)
            navigate('/')
        } catch (error) {
            console.log("Data is not sent!!",error)
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onsubmit)}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" {...register('name',{
                        required: {
                            value: true,
                            message: "Name is required"
                        }
                    })} />
                    <p>{errors.name?.message}</p>
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="text" name="image" id="image" {...register('image',{
                        required: {
                            value: true,
                            message: "Image is required"
                        }
                    })} />
                    <p>{errors.image?.message}</p>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="text" name="price" id="price" {...register('price',{
                        required: {
                            value: true,
                            message: "Price is required"
                        }
                    })} />
                    <p>{errors.price?.message}</p>
                </div>
                <button type="submit">Add Food</button>
            </form>
        </div>
    )
}

export default AddFood