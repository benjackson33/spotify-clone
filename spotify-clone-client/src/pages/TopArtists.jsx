import { useEffect, useState } from "react";
import { getUsersTopItems } from "../utils/spotifyConfig";
import styles from "../styles/TopArtists.module.css";
import ArtistCard from "../components/ArtistCard";

const TopArtists = ({ token }) => {
  const [topArtists, setTopArtists] = useState(null);
  const [timeRange, setTimeRange] = useState("short_term");
  //         |
  // https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  // Available timeRange options:
  // short_term || medium_term || long_term

  useEffect(() => {
    const fetchTopArtistsData = async () => {
      try {
        const { data } = await getUsersTopItems("artists", timeRange);
        setTopArtists(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTopArtistsData();
  }, [token, timeRange]);

  useEffect(() => {
    // console.log(topArtists);
  }, [topArtists]);

  return (
    <div>
      <h2>Top artists this month</h2>
      <p>Only visible to you</p>
      <ul className={styles.topArtists}>
        {topArtists &&
          topArtists.items.map((artist, i) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
      </ul>
    </div>
  );
};

export default TopArtists;
