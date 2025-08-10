// import { useForm } from "react-hook-form";
// import axios from "../../utils/axios";
// import { useNavigate } from "react-router-dom";

// function AddItem() {
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       await axios.post("/products/add-item", data);
//       navigate(`/${data.gender}`);
//       reset();
//     } catch (error) {
//       console.error("Error adding item:", error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Add New Product</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input placeholder="Name" {...register("name", { required: true })} />
//         {errors.name && <p>Name is required</p>}

//         <textarea placeholder="Description" {...register("description")} />

//         <input type="number" placeholder="Price" {...register("price", { required: true })} />
//         <input placeholder="Image URL" {...register("photo", { required: true })} />

//         <select {...register("gender", { required: true })}>
//           <option value="">Gender</option>
//           <option value="men">Men</option>
//           <option value="women">Women</option>
//           <option value="children">Children</option>
//         </select>

//         <select {...register("category", { required: true })}>
//           <option value="">Category</option>
//           <option value="shirt">Shirt</option>
//           <option value="tshirt">T-Shirt</option>
//           <option value="pant">Pant</option>
//           <option value="jeans">Jeans</option>
//           <option value="shoes">Shoes</option>
//         </select>

//         <button type="submit">Add Item</button>
//       </form>
//     </div>
//   );
// }

// export default AddItem;


import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-3xl p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Add New Product 🛒
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Fill out the details below to list your product.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              {...register("name", { required: true })}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              placeholder="Write a short product description"
              {...register("description")}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Price (₹)
            </label>
            <input
              type="number"
              placeholder="Price in INR"
              {...register("price", { required: true })}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Image URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              {...register("photo", { required: true })}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Gender
            </label>
            <select
              {...register("gender", { required: true })}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="children">Children</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              {...register("category", { required: true })}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            >
              <option value="">Select Category</option>
              <option value="shirt">Shirt</option>
              <option value="tshirt">T-Shirt</option>
              <option value="pant">Pant</option>
              <option value="jeans">Jeans</option>
              <option value="shoes">Shoes</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition duration-300"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
