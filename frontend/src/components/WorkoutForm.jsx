import { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "./../hooks/useAuthContext";

const WorkoutForm = ({ workout, setEdit }) => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    load: "",
    reps: "",
  });

  // Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Add
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user === null) {
      setError("You must be logged in");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/workouts`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await res.json();

      if (res.ok) {
        setFormData({ title: "", load: "", reps: "" });
        dispatch({ type: "CREATE_WORKOUT", payload: data });
        setEmptyFields([]);
      } else {
        setError(data.error);
        setEmptyFields(data.emptyFields);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Submit Edit
  const handleEdit = async (e) => {
    e.preventDefault();
    if (user === null) {
      setError("You must be logged in");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/workouts/${workout._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: "UPDATE_WORKOUT", payload: data });
        setEdit(null);
        setFormData({ title: "", load: "", reps: "" });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (workout) {
      setFormData({
        title: workout.title,
        load: workout.load,
        reps: workout.reps,
      });
    }
  }, [workout]);

  // handle Empty Fields style
  const emptyFieldStyle = (field) => {
    return emptyFields.includes(field) ? "error" : "";
  };

  return (
    <form onSubmit={workout ? handleEdit : handleSubmit}>
      <h3 className="create"> {workout ? "Edit " : "Add a new "} Workout</h3>

      <label>Exersice Title:</label>
      <input
        type="text"
        onChange={handleChange}
        name="title"
        value={formData.title}
        className={emptyFieldStyle("title")}
      />

      <label>Exersice Loads:</label>
      <input
        type="number"
        onChange={handleChange}
        name="load"
        value={formData.load}
        className={emptyFieldStyle("load")}
      />

      <label>Exersice Reps:</label>
      <input
        type="number"
        onChange={handleChange}
        name="reps"
        value={formData.reps}
        className={emptyFieldStyle("reps")}
      />

      <button type="submit">{workout ? "Edit " : "Add New "}</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
