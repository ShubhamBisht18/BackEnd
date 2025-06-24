import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddFood() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await axios.post('http://localhost:5000/api/food/add', data);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Name" {...register("name")} required />
      <input placeholder="Image URL" {...register("image")} required />
      <input type="number" placeholder="Price" {...register("price")} required />
      <button type="submit">Add Food</button>
    </form>
  );
}
