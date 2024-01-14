import timeConversion from "../utils/timeConversion";
import styles from "../styles/ArtistCard.module.css";
import { useEffect, useState } from "react";

const ArtistCard = ({ artist }) => {
  const [artistId, setArtistId] = useState(null)

  const handleClick = (evt) => {
    console.log(evt.currentTarget.id);
    setArtistId(evt.currentTarget.id)
  };

  // useEffect(() => {
    
  // }, [artistId])

  return (
    <li id={artist.id} className={styles.card} onClick={handleClick}>
      <img className={styles.image} src={artist.images[0].url} alt="" />
      <div className={styles.content}>
        <h3>{artist.name}</h3>
        <p>{artist.type}</p>
      </div>
    </li>
  );
};

export default ArtistCard;