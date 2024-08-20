import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditFoodForm = ({ handleUpdateFood }) => {
  const { restaurantId, foodId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    type: 'Appetizer',
    description: '',
    price: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFood() {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/restaurants/${restaurantId}/menu/${foodId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setFormData({
        name: data.name,
        type: data.type,
        description: data.description,
        price: data.price,
      });
    }
    fetchFood();
  }, [restaurantId, foodId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await handleUpdateFood(restaurantId, foodId, formData);
    navigate(`/restaurants/${restaurantId}/menu/${foodId}`);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Food Name:</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        
        <label htmlFor="type">Type:</label>
        <select
          required
          name="type"
          id="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="Appetizer">Appetizer</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverage">Beverage</option>
        </select>

        <label htmlFor="description">Description:</label>
        <textarea
          required
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />
        
        <label htmlFor="price">Price:</label>
        <input
          required
          type="number"
          name="price"
          id="price"
          value={formData.price}
          onChange={handleChange}
        />

        <button type="submit">Update Food</button>
      </form>
    </main>
  );
};

export default EditFoodForm;
