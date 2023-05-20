import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const WorkoutsContextProvider = ({ children }) => {
  // reducer
  const workoutsReducer = (state, action) => {
    switch (action.type) {
      case "CREATE_WORKOUT":
        return {
          workouts: [action.payload, ...state.workouts],
        };
      case "SET_WORKOUTS":
        return {
          workouts: action.payload,
        };
      case "DELETE_WORKOUT":
        return {
          workouts: state.workouts.filter(
            (workout) => workout._id !== action.payload._id
          ),
        };
      case "UPDATE_WORKOUT":
        return {
          workouts: state.workouts.map((workout) => {
            if (workout._id === action.payload._id) {
              workout = action.payload;
            }
            return workout;
          }),
        };
    }
  };

  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
