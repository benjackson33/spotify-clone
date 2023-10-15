import { NavLink } from "react-router-dom";

const NavBar = () => {
  let navList = [
    {
      text: "Profile",
      link: "/",
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
    <ul>
      {navList.map(({ text, link }) => (
        <li>
          <NavLink to={link}>{text}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
