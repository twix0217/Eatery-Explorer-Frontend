const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/restaurants`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (restaurantId) => {
  try {
    const res = await fetch(`${BASE_URL}/${restaurantId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getOwnerById = async (ownerId) => {
  try {
    const response = await fetch(`${BASE_URL}/owners/${ownerId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch owner');
    }
    return response.json();
  } catch (error) {
    console.log('Error fetching owner:', error);
  }
};



const create = async (formData) => {
  const options = {
    method: 'POST',
    headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
    body: JSON.stringify(formData)
  }
  const res = await fetch(BASE_URL, options)

  return res.json()
}


const showFood = async (restaurantId,foodId) => {
  try {
    const res = await fetch(`${BASE_URL}/${restaurantId}/menu/${foodId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


export default { index, show, create, getOwnerById , showFood };