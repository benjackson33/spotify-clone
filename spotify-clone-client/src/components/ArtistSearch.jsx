import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/ArtistSearch.module.css";

const ArtistSearch = ({ searchInput, accessToken }) => {
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const getArtist = async () => {
      try {
        const res = await axios.get(
          `https://api.spotify.com/v1/search?q=remaster%2520artist%3A${searchInput}&type=artist&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setArtist(res.data.artists.items);
        // console.log(res.data.artists.items);
      } catch (err) {
        console.error(err);
      }
    };

    getArtist(); // Call the function to make the request
  }, [accessToken, searchInput]);

  //   useEffect(() => {
  //   console.log(artist);
  //   }, [artist]);

  return (
    <>
      <div className={styles.cardWrapper}>
        {artist && artist.map((item) => (
          <div className={styles.card} key={item.id}>
            {item.images.length > 0 && (
              <div className={styles.imageWrp}>
              <img className={styles.image} src={item.images[0].url} alt={item.name} />
            </div>
            )}
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </>
  );
  
};

export default ArtistSearch;
