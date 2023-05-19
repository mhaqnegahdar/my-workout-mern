import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    load: 0,
    reps: 0,
  });

  // Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/workouts", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();

      if (res.ok) {
        setFormData({ title: "", load: 0, reps: 0 });
        dispatch({ type: "CREATE_WORKOUT", payload: data });
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="create">Add a new Workout</h3>

      <label>Exersice Title:</label>
      <input
        type="text"
        onChange={handleChange}
        name="title"
        value={formData.title}
      />

      <label>Exersice Loads:</label>
      <input
        type="number"
        onChange={handleChange}
        name="load"
        value={formData.load}
      />

      <label>Exersice Reps:</label>
      <input
        type="number"
        onChange={handleChange}
        name="reps"
        value={formData.reps}
      />

      <button type="submit">Add New</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
