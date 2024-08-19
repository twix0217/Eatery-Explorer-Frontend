import { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddFoodForm = ({ handleAddFood }) => {
  const { restaurantId } = useParams(); 
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    price: '',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddFood(restaurantId, formData); 
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

        <button type="submit">Add Food</button>
      </form>
    </main>
  );
};

export default AddFoodForm;
