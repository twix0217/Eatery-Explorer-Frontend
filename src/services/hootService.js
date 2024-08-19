const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/restaurants`;

// Fetch all restaurants
const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) throw new Error('Failed to fetch restaurants');
    return res.json();
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return [];
  }
};

// Fetch a specific restaurant by ID
const show = async (restaurantId) => {
  try {
    const res = await fetch(`${BASE_URL}/${restaurantId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) throw new Error('Failed to fetch restaurant');
    return res.json();
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return null;
  }
};

// Create a new restaurant
const create = async (formData) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };
  try {
    const res = await fetch(BASE_URL, options);
    if (!res.ok) throw new Error('Failed to create restaurant');
    return res.json();
  } catch (error) {
    console.error('Error creating restaurant:', error);
    return null;
  }
};

// Update an existing restaurant
const update = async (restaurantId, formData) => {
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };
  try {
    const res = await fetch(`${BASE_URL}/${restaurantId}`, options);
    if (!res.ok) throw new Error('Failed to update restaurant');
    return res.json();
  } catch (error) {
    console.error('Error updating restaurant:', error);
    return null;
  }
};

export default { index, show, create, update };
