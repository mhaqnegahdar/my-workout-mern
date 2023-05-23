import { createContext, useReducer, useEffect } from "react";
import { getLocalStorage } from "../utils/localstorage";

export const AuthContext = createContext();
// reducer
export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };

    case "LOGOUT":
      return {
        user: null,
      };

    default:
      return state;
  }
};

// provider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
  });
  //Initial Auth status
  useEffect(() => {
    const user = getLocalStorage("user");

    if (user && user.length !== 0) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
