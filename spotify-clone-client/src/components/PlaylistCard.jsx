import { ReactPropTypes } from "react";
import { spotifyLogo } from "../utils/spotifyConfig";
import styles from "../styles/PlaylistCard.module.css";
import { Link } from "react-router-dom";

const PlaylistCard = ({ playlist }) => {
  // console.log(playlist);

  return (
    //     <>
    //     <div className={styles.playlistWrapper}>
    //         <div className={styles.playlistImg}>
    //             <img src={playlist.images[0] ? playlist.images[0].url : spotifyLogo} alt="" />
    //         </div>
    //       <h4 style={{ color: "white" }}>{playlist.name}</h4>
    //       </div>
    //     </>

    // <>
    <>
      <tr>
        <td rowSpan={2}>
          <img
            src={playlist.images[0] ? playlist.images[0].url : spotifyLogo}
            alt=""
          />
        </td>
        <Link to={`/playlist/${playlist.id}`}>
          <td> {playlist.name}</td>
        </Link>
      </tr>
      <tr>
        <td>{playlist.owner.display_name}</td>
      </tr>
    </>
  );
};

export default PlaylistCard;
