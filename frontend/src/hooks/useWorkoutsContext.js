import { useContext } from "react";
import { WorkoutsContext } from "../contexts/WorkoutsContext";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside of a WorkoutsContext Provider"
    );
  }

  return context;
};
