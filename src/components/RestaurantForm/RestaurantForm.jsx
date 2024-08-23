import { useState } from 'react';
import './RestaurantForm.css';
const restaurantForm = ({ handleAddRestaurant }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    describtion: '',
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
    <main className="restaurant-form">
      <form onSubmit={handleSubmit} className="restaurant-form-container">
      <div className="form-group">
        <label htmlFor="name" className="form-label">name:</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          value={formData.title}
          onChange={handleChange}
            className="form-input"
        />
         </div>

         <div className="form-group">
        <label htmlFor="describtion" className="form-label">description</label>
        <textarea
          required
          name="describtion"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
             className="form-textarea"
        />
         </div>

         <div className="form-group">
        <label htmlFor="location" className="form-label">location</label>
        <textarea
          required
          type="location"
          name="location"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
             className="form-input"
        />
          </div>

          <div className="form-group">

        <label htmlFor="cuisine" className="form-label">Cuisine</label>
        <select
          required
          name="cuisine"
          id="cuisine"
          value={formData.category}
          onChange={handleChange}
           className="form-select"
        >
          <option value="italian">italian</option>
          <option value="indian">indian</option>
          <option value="persian">persian</option>
          <option value="arabian">arabian</option>
          <option value="japanese">japanese</option>
          <option value="mexican">mexican</option>
        </select>
        </div>
        <button type="submit"  className="submit-button">SUBMIT</button>
      </form>
    </main>
  );
};

export default restaurantForm;