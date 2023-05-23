import { removeLocalStorage } from "../utils/localstorage";
import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchWorkouts } = useWorkoutsContext();

  const logout = () => {
    // remove user from local storage
    removeLocalStorage("user");

    // dispatch Logout action
    dispatch({ type: "LOGOUT" });
    //dispatch SET_WORKOUTS action
    dispatchWorkouts({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
