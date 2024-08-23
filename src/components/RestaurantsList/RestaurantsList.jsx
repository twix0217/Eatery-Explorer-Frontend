import { Link } from 'react-router-dom';
import AuthorDate from '../common/AuthorDate';
import './RestaurantsList.css';
const restaurantsList = ({restaurants}) => {
  if (!restaurants.length) return <main className="loading">Loading...</main>;

  return ( 
    <main className="restaurants-list">
      {restaurants.map((restaurant) => (
        <Link key={restaurant._id} to={`/restaurants/${restaurant._id}`} className="restaurant-link">
          <div className="restaurant-card">
            <div className="restaurant-info">
              <h2 className="restaurant-name">{restaurant.name}</h2>
          
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
};

export default restaurantsList;