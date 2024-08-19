import { useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";

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
        <h3>description: {restaurant.describtion}</h3>
        <h3>location: {restaurant.location}</h3>
        <h3>cuisine: {restaurant.cuisine}</h3>

        <ul>
          <p>main dishes :</p>
  {restaurant.menu.map((item) =>
    item.type === "main" ? (
      <>
        <ul>
          <li>{item.name}</li>
          <li>{item.description}</li>
          <li>{item.type}</li>
          <li>{item.price}</li>
        </ul>
        <hr />
      </>
    ) : null
  )}
</ul>
<br />
<ul>

          <p>side dishes :</p>
  {restaurant.menu.map((item) =>
    item.type === "side" ? (
      <>
        <ul>
          <li>{item.name}</li>
          <li>{item.description}</li>
          <li>{item.type}</li>
          <li>{item.price}</li>
        </ul>
        <hr />
      </>
    ) : null
  )}
</ul>

<br />
<ul>

          <p>drinks :</p>
  {restaurant.menu.map((item) =>
    item.type === "Drinks" ? (
      <>
        <ul>
          <li>{item.name}</li>
          <li>{item.description}</li>
          <li>{item.type}</li>
          <li>{item.price}</li>
        </ul>
        <hr />
      </>
    ) : null
  )}
</ul>





        {/* <AuthorDate name={hoot.author.username} date={hoot.createdAt}/> */}
      </header>
      <p>{restaurant.description}</p>
      <section></section>
    </main>
  );
};

export default resturauntDetails;
