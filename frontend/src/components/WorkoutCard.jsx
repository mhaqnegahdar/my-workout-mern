import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutCard = ({ workout, setEdit }) => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();
  // handle Delete
  const handleDelete = async () => {
    if (user === null) {
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/workouts/${workout._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: "DELETE_WORKOUT", payload: data });
      }
    } catch (error) {}
  };
  // handle Edit
  const handleEdit = async () => {
    if (user === null) {
      return;
    }
    setEdit(workout);
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

      <div className="buttons">
        <button onClick={handleDelete} className="delete">
          <FaRegTrashAlt />
        </button>
        <button onClick={handleEdit} className="edit">
          <FaEdit />
        </button>
      </div>
    </article>
  );
};

export default WorkoutCard;
