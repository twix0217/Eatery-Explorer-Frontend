import { useState } from 'react';

const restaurantForm = ({ handleAddRestaurant }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    cuisine: 'italian',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddRestaurant(formData);

  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">name:</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="description">description</label>
        <textarea
          required
          type="description"
          name="description"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        
        <label htmlFor="location">location</label>
        <textarea
          required
          type="location"
          name="location"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="cuisine">Cuisine</label>
        <select
          required
          name="cuisine"
          id="cuisine"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="italian">italian</option>
          <option value="indian">indian</option>
          <option value="persian">persian</option>
          <option value="arabian">arabian</option>
          <option value="japanese">japanese</option>
          <option value="mexican">mexican</option>
        </select>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default restaurantForm;