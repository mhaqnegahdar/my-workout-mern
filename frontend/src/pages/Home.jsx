import { useEffect } from "react";
import WorkoutCard from "../components/WorkoutCard";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
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
  }, []);
  return (
    <section className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutCard key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </section>
  );
};

export default Home;
