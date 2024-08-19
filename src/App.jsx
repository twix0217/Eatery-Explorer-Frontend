import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import authService from "./services/authService";
import hootService from "./services/hootService";
import FoodDetails from "./components/foodDetails/foodDetails";

// Components
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import HootList from "./components/HootList/HootList";
import HootDetails from "./components/HootDetails/HootDetails";
import HootForm from "./components/HootForm/HootForm";
import UpdateForm from "./components/HootForm/UpdateForm";
import OwnerDetails from "./components/OwnerDetails/OwnerDetails";

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const [resId, setRestId] = useState(null);


  useEffect(() => {
    async function getRestaurants() {
      const restaurantData = await hootService.index();
      setRestaurants(restaurantData);
    }
    if (user) {
      getRestaurants();
    }
  }, [user]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddRestaurant = async (formData) => {
    const newRestaurant = await hootService.create(formData);
    setRestaurants([...restaurants, newRestaurant]);
    navigate("/restaurants");
  };

  const handleUpdateRestaurant = async (restaurantId, formData) => {
    try {
      const updatedRestaurant = await hootService.update(restaurantId, formData);
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) =>
          restaurant._id === restaurantId ? updatedRestaurant : restaurant
        )
      );
      navigate(`/restaurants/${restaurantId}`);
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };
  
  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        {user ? (
          // Protected Routes:
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/restaurants" element={<HootList restaurants={restaurants} />} />
            <Route path="/restaurants/:restaurantsId" element={<HootDetails setRestId={setRestId}/>}  />

            <Route path={`/restaurants/:restaurantId/menu/:foodId`} element={<FoodDetails restaurants={restaurants} resId={resId}/>} />
            <Route
              path="/restaurants/new"
              element={<HootForm handleAddRestaurant={handleAddRestaurant} />}
            />
            <Route path="/owners/:ownerId" element={<OwnerDetails />} />
           <Route path="/restaurants/:restaurantId/edit" element={<UpdateForm handleUpdateRestaurant={handleUpdateRestaurant} />} />
           <Route path="/restaurants/:restaurantId/add-food" component={AddFoodForm} />
          </>
        ) : (
          // Public Route:
          <Route path="/" element={<Landing />} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
      </Routes>
    </>
  );
};

export default App;