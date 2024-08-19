import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import hootService from "../../services/hootService";
import commentService from "../../services/commentService";

// Components
import AuthorDate from "../common/AuthorDate";
import CommentForm from "../CommentForm/CommentForm";
import { Link } from "react-router-dom";

const HootDetails = (props) => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null); // Initialize state to null

  useEffect(() => {
    async function getRestaurant() {
      const restaurantData = await hootService.show(restaurantId);
      console.log(restaurantData);
      setRestaurant(restaurantData);
    }
    getRestaurant();
  }, [restaurantId]);

  if (!restaurant) {
    return (
      <main>
        <h3>Loading...</h3>
      </main>
    );
  }

  const handleAddComment = async (formData) => {
    const newComment = await commentService.create(restaurantId, formData);

    const updatedRestaurant = { ...restaurant };
    updatedRestaurant.comments.push(newComment);

    setRestaurant(updatedRestaurant);
  };

  const handleUpdateComment = async (formData) => {
    const newComment = await commentService.create(restaurantId, formData);

    const updatedRestaurant = { ...restaurant };
    updatedRestaurant.comments.push(newComment);

    setRestaurant(updatedRestaurant);
  };

  return (
    <main>
      <header>
        <h1>{restaurant.name.toUpperCase()}</h1>
        <h1>{restaurant.type}</h1>
        <h3>Description: {restaurant.describtion}</h3>
        <h3>Location: {restaurant.location}</h3>
        <h3>Cuisine: {restaurant.cuisine}</h3>

        {/* Dishes and Menu rendering */}
        <ul>
          <p>Main dishes:</p>
          {restaurant.menu.map((item) =>
            item.type === "main" ? (
              <ul key={item.name}>
                <li>{item.name}</li>
              </ul>
            ) : null
          )}
        </ul>
        <hr />
        <br />

        <ul>
          <p>Side dishes:</p>
          {restaurant.menu.map((item) =>
            item.type === "side" ? (
              <ul key={item.name}>
                <li>{item.name}</li>
              </ul>
            ) : null
          )}
        </ul>
        <hr />
        <br />

        <ul>
          <p>Drinks:</p>
          {restaurant.menu.map((item) =>
            item.type === "Drinks" ? (
              <ul key={item.name}>
                <li>{item.name}</li>
              </ul>
            ) : null
          )}
        </ul>
        <hr />
      </header>

      <section>
        <h2>Comments on {restaurant.name.toUpperCase()}:</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {restaurant.comments.length === 0 ? (
          <p>There are no comments.</p>
        ) : (
          <>
            {restaurant.comments.map((comment) => (
              <div key={comment._id}>
                <p>
                  <b>{comment.authorName}</b> : {comment.text}
                </p>
              </div>
            ))}
          </>
        )}
      </section>
      <section>
        <>
      

      <Link to={`/restaurants/${restaurant._id}/edit`}>Edit Restaurant</Link>
        </>
      </section>
    </main>
  );
  
};

export default HootDetails;
