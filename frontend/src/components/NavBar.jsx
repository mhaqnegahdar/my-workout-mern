import { NavLink } from "react-router-dom";
import { useLogout } from "./../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import { getLocalStorage } from "../utils/localstorage";

const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(user);
    console.log(getLocalStorage("user"));
  }, [user]);

  return (
    <header>
      <div className="container">
        <NavLink to="/">
          <h1>Workout Buddy</h1>
        </NavLink>

        <nav>
          <button onClick={() => logout()}>Logout</button>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
