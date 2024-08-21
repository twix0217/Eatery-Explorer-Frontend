import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import hootService from "../../services/hootService";
import commentService from "../../services/commentService";
import { Link } from "react-router-dom";
// Components
import AuthorDate from "../common/AuthorDate";
import CommentForm from "../CommentForm/CommentForm";

const foodDetails = (props) => {
  const { restaurantId, foodId } = useParams();

  const [food, setFood] = useState(null);
  const [restoId, setRestoId] = useState(null);
  const [restaurant, setRestaurant] = useState(props.selectedRestaurant);

  // async function getRestaurant() {
  //   const restaurantData = await hootService.show(restaurantId);
  //   // console.log(restaurantData);
  //   setRestaurant(restaurantData);
  //   // setComment(restaurantData.comments);
  //   // props.setRestId(restaurantsId);
  // }

  useEffect(() => {
    async function getFood() {
      const foodData = await hootService.showFood(restaurantId, foodId);
      setFood(foodData);
      //console.log("yi i", food);
      setRestoId(restaurantId);
    }
    getFood();
    // getRestaurant();
  }, [foodId, restaurantId]);

  const handleAddComment = async (formData) => {
    const newComment = await commentService.createFC(
      restaurantId,
      foodId,
      formData
    );

    const copyFood = { ...food };
    copyFood.comments.push(newComment);
    setFood(copyFood);
  };

  //----------------------------------------------

  const handlesubmitDelete = async (e) => {
    e.preventDefault();
    handleDeleteComment(restaurantId, foodId, e.target.id);

    const newRes = food.comments.filter(
      (comment) => comment._id !== e.target.id
    );

    const updatefood = { ...food, comments: newRes };
    setFood(updatefood);

    console.log(newRes);
    //setRestaurant(newRes);
  };

  //----------------------------------------------

  const handleDeleteComment = async (rId, foodId, commentId) => {
    commentService.deleteFoodComment(rId, foodId, commentId);

    // await props.handleDeleteRestaurant(restaurantsId);
    // navigate(`/owners/${props.user.id}`);
  };

  const handleDeleteClick = () => {
    props.handleDeleteFood(restoId, food._id);
  };

  //----------------------------------------------

  if (!food) {
    return <main>loading....</main>;
  }

  return (
    <>
      <h4>{food.name}</h4>
      <ul>
        <li>dish type : {food.type}</li>
        <li>dish description :{food.description}</li>
        <li>price : {food.price}</li>
        {props.user.id === restaurant.owner && (
          <p>
            <Link to={`/restaurants/${restaurantId}/menu/${foodId}/edit`}>
              Edit
            </Link>
            <button onClick={handleDeleteClick}>Delete Food</button>
          </p>
        )}
      </ul>

      {food.comments.length === 0 ? (
        <>
          <h4>no comments yet</h4>
          <CommentForm handleAddComment={handleAddComment} />
        </>
      ) : (
        <>
          <ul>
            <h4>comments:</h4>

            <CommentForm handleAddComment={handleAddComment} />
            {food.comments.map((comment) => {
              return (
                <div>
                  <form
                    action=""
                    id={comment._id}
                    onSubmit={handlesubmitDelete}
                  >
                    <p>
                      <b>{comment.authorName}</b>: {comment.text}
                    </p>

                    {comment.authorId === props.user.id ? (
                      <button type="submit">delete</button>
                    ) : null}
                  </form>
                </div>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};
export default foodDetails;
