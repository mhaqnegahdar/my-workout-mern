import { removeLocalStorage } from "../utils/localstorage";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user from local storage
    removeLocalStorage("user");

    // dispatch Logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
