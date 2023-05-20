import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <p>
        {new Date().getFullYear()} &copy;{" "}
        <Link to="https://github.com/maxjn"> Mohamad Haqnegahdar (maxjs)</Link>
      </p>
    </footer>
  );
};

export default Footer;
