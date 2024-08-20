const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/restaurants`;

const create = async (restaurantId, formData) => {
  try {
    const data = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const res = await fetch(`${BASE_URL}/${restaurantId}/comments/`, data);

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const createFC = async (restaurantId, foodId, formData) => {
  try {
    const data = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const res = await fetch(`${BASE_URL}/${restaurantId}/menu/${foodId}/comments`, data);

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const deleteC = async (restaurantId, commentId) => {
  try {
    const data = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res = await fetch(`${BASE_URL}/${restaurantId}/comments/${commentId}`, data);

    return res.json();
  } catch (e) {
    console.log(e);
  }
};


const deleteFoodComment = async (restaurantId,foodId, commentId) => {
  try {
    const data = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res = await fetch(`${BASE_URL}/${restaurantId}/menu/${foodId}/comments/${commentId}`, data);

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export default {
  create,createFC,deleteC,deleteFoodComment
};
