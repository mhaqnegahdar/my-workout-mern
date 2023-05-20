import { FaRegTrashAlt } from "react-icons/fa";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutCard = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/workouts/${workout._id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: "DELETE_WORKOUT", payload: data });
      }
    } catch (error) {}
  };
  return (
    <article className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): {""}</strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps:{""} </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleDelete}>
        <FaRegTrashAlt />
      </span>
    </article>
  );
};

export default WorkoutCard;
