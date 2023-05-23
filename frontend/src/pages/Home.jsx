import { useEffect, useState } from "react";
import WorkoutCard from "../components/WorkoutCard";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  //form state
  const [edit, setEdit] = useState(null);
  const { user } = useAuthContext();
  // manage workouts state globally
  const { workouts, dispatch } = useWorkoutsContext();
  // fetch all the workouts
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (user === null || user === undefined) {
        return;
      }
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/api/workouts`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
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
