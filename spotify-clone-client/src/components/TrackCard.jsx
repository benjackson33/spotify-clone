import timeConversion from "../utils/timeConversion";
import styles from "../styles/TrackCard.module.css";
import { useEffect, useState } from "react";

const TrackCard = ({ track }) => {
  const [trackId, setTrackId] = useState(null)

  const handleClick = (evt) => {
    console.log(evt.currentTarget.id);
    setTrackId(evt.currentTarget.id)
  };

  return (
    <li id={track.id} className={styles.card} onClick={handleClick}>
      <img className={styles.image} src={track.album.images[0].url} alt="" />
      <div className={styles.content}>
        <h3>{track.name}</h3>
        <p>{track.artists[0].name}</p>
      </div>
    </li>
  );
};

export default TrackCard;
