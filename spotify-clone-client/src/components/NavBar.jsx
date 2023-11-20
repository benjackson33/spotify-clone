import { NavLink } from "react-router-dom";

const NavBar = () => {
  let navList = [
    {
      id: 1,
      text: "Home",
      link: "/",
    },
    {
      id: 2,
      text: "Profile",
      link: "/profile",
    },
    {
      id: 3,
      text: "Top Tracks",
      link: "/top-tracks",
    },
    {
      id: 4,
      text: "Playlists",
      link: "/playlists"
    }
  ];

  return (
    <nav className="sidebar" >
      <ul>
        {navList.map(({ id, text, link }) => (
          <li key={id}>
            <NavLink  to={link}>{text}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;