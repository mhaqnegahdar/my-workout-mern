import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
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

  // handle Empty Fields style
  const emptyFieldStyle = (field) => {
    return emptyFields.includes(field) ? "error" : "";
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

      <button type="submit">Add New</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
