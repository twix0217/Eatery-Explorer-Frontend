import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import authService from "./services/authService";
import hootService from "./services/hootService";

// Components
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import HootList from "./components/HootList/HootList";
import HootDetails from "./components/HootDetails/HootDetails";
import HootForm from "./components/HootForm/HootForm";

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getRestaurants() {
      const restaurantData = await hootService.index();
      setRestaurants(restaurantData);
    }
    if (user) {
      // fetch the hoots
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

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        {user ? (
          // Protected Routes:
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/restaurants" element={<HootList restaurants={restaurants} />} />
            <Route path="/restaurants/:restaurantsId" element={<HootDetails />} />
            <Route
              path="/restaurants/new"
              element={<HootForm handleAddRestaurant={handleAddRestaurant} />}
            />
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
//
