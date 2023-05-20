import { useEffect, useState } from "react";
import WorkoutCard from "../components/WorkoutCard";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
  //form state
  const [edit, setEdit] = useState(null);
  // manage workouts state globally
  const { workouts, dispatch } = useWorkoutsContext();
  // fetch all the workouts
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/workouts");
        const data = await res.json();

        if (res.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: data });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWorkouts();
  }, [dispatch]);
  return (
    <section className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              workout={workout}
              setEdit={setEdit}
            />
          ))}
      </div>
      {edit ? (
        <WorkoutForm workout={edit} setEdit={setEdit} />
      ) : (
        <WorkoutForm />
      )}
    </section>
  );
};

export default Home;
