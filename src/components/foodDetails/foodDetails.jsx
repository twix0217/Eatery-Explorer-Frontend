import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import hootService from "../../services/hootService";
import commentService from "../../services/commentService";

// Components
import AuthorDate from "../common/AuthorDate";
import CommentForm from "../CommentForm/CommentForm";

const foodDetails = (props) => {
  const { restaurantId, foodId } = useParams();

  const [food, setFood] = useState(null);
  const [restoId, setRestoId] = useState(null);


  useEffect(() => {
    async function getFood() {
      const foodData = await hootService.showFood(restaurantId, foodId);
      setFood(foodData);
      //console.log("yi i", food);
      setRestoId(restaurantId);
    }
    getFood();
    
  }, [foodId]);

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
                <li key={comment._id}>
                  <p>
                    {" "}
                    <b>{comment.authorName}</b> : {comment.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};
export default foodDetails;
