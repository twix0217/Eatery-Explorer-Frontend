import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import FoodDetails from "../foodDetails/foodDetails";
// Services
import hootService from "../../services/hootService";
import commentService from "../../services/commentService";

// Components
import AuthorDate from "../common/AuthorDate";
import CommentForm from "../CommentForm/CommentForm";



const resturauntDetails = (props) => {
  const { restaurantsId } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    async function getRestaurant() {
      const restaurantData = await hootService.show(restaurantsId);
      console.log(restaurantData);
      setRestaurant(restaurantData);
      props.setRestId(restaurantsId);
    }
    getRestaurant();
  }, [restaurantsId]);

  const handleAddComment = async (formData) => {
    const newComment = await commentService.create(restaurantsId, formData);

    const copyRestaurant = { ...restaurant };
    copyRestaurant.comments.push(newComment);

    setRestaurant(copyRestaurant);
  };

  if (!restaurant) {
    return (
      <main>
        <h3>Loading...</h3>
      </main>
    );
  }

  return (
    <main>

      <header>
        <h1>{restaurant.name.toUpperCase()}</h1>
        <h1>{restaurant.type}</h1>
        <h3>Description: {restaurant.description}</h3>
        <h3>location: {restaurant.location}</h3>
        <h3>cuisine: {restaurant.cuisine}</h3>

        <ul>
  {restaurant.menu
    .filter(item => item.type === "Main Course") 
    .map(item => (
      <li key={item._id}>
        <Link to={`/restaurants/${restaurant._id}/menu/${item._id}`}>{item.name}</Link>
        <ul>
          <li>Description: {item.description}</li>
          <li>Type: {item.type}</li>
          <li>Price: ${item.price}</li>
        </ul>
      </li>
    ))}
</ul>
<hr />
<br />

<ul>
  {restaurant.menu
    .filter(item => item.type === "Side") 
    .map(item => (
      <li key={item._id}>
        <Link to={`/restaurants/${restaurant._id}/menu/${item._id}`}>{item.name}</Link>
        <ul>
          <li>Description: {item.description}</li>
          <li>Type: {item.type}</li>
          <li>Price: ${item.price}</li>
        </ul>
      </li>
    ))}
</ul>

<hr />
<br />
<ul>
  {restaurant.menu
    .filter(item => item.type === "Beverage") // Ensure this matches your AddFoodForm
    .map(item => (
      <li key={item._id}>
        <Link to={`/restaurants/${restaurant._id}/menu/${item._id}`}>{item.name}</Link>
        <ul>
          <li>Description: {item.description}</li>
          <li>Type: {item.type}</li>
          <li>Price: ${item.price}</li>
        </ul>
      </li>
    ))}
</ul>

<hr />





        {/* <AuthorDate name={hoot.author.username} date={hoot.createdAt}/> */}
      </header>

     
      <section>


 <Link to={`/restaurants/${restaurant._id}/edit`}>Edit Restaurant</Link>
 <Link to={`/restaurants/${restaurant._id}/add-food`}>Add Food</Link>
<section>
        <h2>Comments on {restaurant.name.toUpperCase()}:</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {/* {!restaurant.comments.length && <p>There are no comments.</p>} */}
        {restaurant.comments.length === 0 ? (
          <p>There are no comments.</p>
        ) : (
          <>
            {restaurant.comments.map((comment) => {
              return (
                <div key={comment._id}>
                
                  <p> <b>{comment.authorName}</b> : {comment.text}</p>
                </div>
              );
            })}
          </>
        )}
      </section>


      </section>
    </main>
  );
};

export default resturauntDetails;
