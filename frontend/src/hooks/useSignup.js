import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { setLocalStorage } from "../utils/localstorage";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/users/signup`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "content-type": "application/json" },
        }
      );
      const data = await res.json();

      if (res.ok) {
        setIsLoading(false);
        setError(null);

        //   update the auth context
        dispatch({ type: "LOGIN", payload: data });

        // save the user to local storage
        setLocalStorage("user", data);
      } else {
        setIsLoading(false);
        setError(data.error);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { signup, error, isLoading };
};
