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
    const newComment = await commentService.createFC(restaurantsId, formData);

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
          <li> <Link key={item._id} to={`/restaurants/${restaurant._id}/menu/${item._id}`}>{item.name}</Link>  </li>
          {/* <li>{item.description}</li>
          <li>{item.type}</li>
          <li>{item.price}</li> */}
        </ul>
      </>
    ) : null
  )}
</ul>
<hr />
<br />

<ul>

          <p>side dishes :</p>
  {restaurant.menu.map((item) =>
    item.type === "side" ? (
      <>
        <ul>
          <li>{item.name}</li>
          {/* <li>{item.description}</li>
          <li>{item.type}</li>
          <li>{item.price}</li> */}
        </ul>
      </>
    ) : null
  )}
</ul>
<hr />
<br />
<ul>

          <p>drinks :</p>
  {restaurant.menu.map((item) =>
    item.type === "Drinks" ? (
      <>
        <ul>
          <li>{item.name}</li>
          {/* <li>{item.description}</li>
          <li>{item.type}</li>
          <li>{item.price}</li> */}
        </ul>
      </>
    ) : null
  )}
</ul>
<hr />





        {/* <AuthorDate name={hoot.author.username} date={hoot.createdAt}/> */}
      </header>

     
      <section>



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
