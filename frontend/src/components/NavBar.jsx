import { NavLink } from "react-router-dom";
import { useLogout } from "./../hooks/useLogout";

const NavBar = () => {
  const { logout } = useLogout();

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
