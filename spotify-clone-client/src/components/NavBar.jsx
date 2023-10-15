import { NavLink } from "react-router-dom";

const NavBar = () => {
  let navList = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "Profile",
      link: "/profile",
    },
    {
      text: "Top Tracks",
      link: "/top-tracks",
    },
  ];

  return (
    <nav className="sidebar" >
      <ul>
        {navList.map(({ text, link }) => (
          <li>
            <NavLink to={link}>{text}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;