const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/restaurants`;


const create = async (restaurantId, formData) => {
  try {
    const data = {
      method: 'POST',
      headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
      body: JSON.stringify(formData)
    }

    const res = await fetch(`${BASE_URL}/${restaurantId}/comments/`, data)

    return res.json()
  }catch(e){
    console.log(e)
  }
}

export default {
  create
}