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
<<<<<<< HEAD
      text: "Top Artists",
      link: "/top-artists",
    },
    {
=======
      id: 3,
>>>>>>> 5d6286e8e816e29e3ffd4c46398143360d10cdf4
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