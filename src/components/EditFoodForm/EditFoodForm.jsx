
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import hootService from '../../services/hootService';

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
      try {
        const food = await hootService.showFood(restaurantId, foodId);
        setFormData({
          name: food.name,
          type: food.type,
          description: food.description,
          price: food.price,
        });
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    }
    fetchFood();
  }, [restaurantId, foodId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await handleUpdateFood(restaurantId, foodId, formData);
      navigate(`/restaurants/${restaurantId}/menu/${foodId}`);
    } catch (error) {
      console.error('Error updating food:', error);
    }
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
          step="0.01"
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