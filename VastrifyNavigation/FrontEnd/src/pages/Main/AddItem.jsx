import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("/products/add-item", data);
      navigate(`/${data.gender}`);
      reset();
    } catch (error) {
      console.error("Error adding item:", error.message);
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Name" {...register("name", { required: true })} />
        {errors.name && <p>Name is required</p>}

        <textarea placeholder="Description" {...register("description")} />

        <input type="number" placeholder="Price" {...register("price", { required: true })} />
        <input placeholder="Image URL" {...register("photo", { required: true })} />

        <select {...register("gender", { required: true })}>
          <option value="">Gender</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="children">Children</option>
        </select>

        <select {...register("category", { required: true })}>
          <option value="">Category</option>
          <option value="shirt">Shirt</option>
          <option value="tshirt">T-Shirt</option>
          <option value="pant">Pant</option>
          <option value="jeans">Jeans</option>
          <option value="shoes">Shoes</option>
        </select>

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;
