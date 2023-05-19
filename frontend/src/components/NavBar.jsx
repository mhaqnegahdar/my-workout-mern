import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <div className="container">
        <NavLink to="/">
          <h1>Workout Buddy</h1>
        </NavLink>
      </div>
    </header>
  );
};

export default NavBar;
