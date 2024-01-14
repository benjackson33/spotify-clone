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
      text: "Top Artists",
      link: "/top-artists",
    },
    {
      id: 4,
      text: "Top Tracks",
      link: "/top-tracks",
    },
    {
      id: 5,
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