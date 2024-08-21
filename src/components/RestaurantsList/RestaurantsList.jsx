import { Link } from 'react-router-dom';
import AuthorDate from '../common/AuthorDate';

const restaurantsList = ({restaurants}) => {
  if (!restaurants.length) return <main>Loading...</main>;

  return <main>
      {
        restaurants .map((restaurant)=> <Link key={restaurant._id} to={`/restaurants/${restaurant._id}`}>
          <article>
            {/* <header>
              <h2>{restaurant.title}</h2>
              <AuthorDate name={restaurant?.owner?.username ?? "Anonymous"} date={restaurant.createdAt}/>
            </header> */}
            <p>{restaurant.name}</p>
          </article>
        </Link>)
      }
    </main>;
};

export default restaurantsList;