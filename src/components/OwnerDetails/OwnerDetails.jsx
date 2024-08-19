import { useParams, Link } from 'react-router-dom'; // Import Link
import { useEffect, useState } from 'react';
import hootService from '../../services/hootService';

const OwnerDetails = () => {
  const { ownerId } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantsAndOwner = async () => {
      try {
        const restaurantsData = await hootService.index(); // Fetch all restaurants
        setRestaurants(restaurantsData.filter(restaurant => restaurant.owner === ownerId));

        const ownerData = await hootService.getOwnerById(ownerId); // Fetch owner details
        setOwner(ownerData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantsAndOwner();
  }, [ownerId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main>
      <header>
        <h1>Restaurants Owned by {owner ? owner.username : 'Loading...'}</h1>
        {restaurants.length === 0 ? (
          <p>No restaurants found.</p>
        ) : (
          <ul>
            {restaurants.map((restaurant) => (
              <li key={restaurant._id}>
                <Link to={`/restaurants/${restaurant._id}`}>
                  <article>
                    <p>{restaurant.name}</p>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </header>
    </main>
  );
};

export default OwnerDetails;
