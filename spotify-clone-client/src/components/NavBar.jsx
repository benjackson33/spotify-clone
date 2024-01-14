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
      text: "Top Artists",
      link: "/top-artists",
    },
    {
      text: "Top Tracks",
      link: "/top-tracks",
    },
    {
      text: "Playlists",
      link: "/playlists"
    }
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