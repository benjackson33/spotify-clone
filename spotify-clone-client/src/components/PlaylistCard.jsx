import { ReactPropTypes } from "react";
import { spotifyLogo } from "../utils/spotifyConfig";

const PlaylistCard = ({ playlist }) => {
  console.log(playlist);

  return (
    <>
    <div className="playlist-wrapper">
        <div className="playlist-img">
            <img src={playlist.images[0] ? playlist.images[0].url : spotifyLogo} alt="" />
        </div>
      <h4 style={{ color: "white" }}>{playlist.name}</h4>
      </div>
    </>
  );
};


export default PlaylistCard;
