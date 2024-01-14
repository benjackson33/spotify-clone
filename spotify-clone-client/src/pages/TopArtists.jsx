import { useEffect, useState } from "react";
import { getUsersTopItems } from "../utils/spotifyConfig";
import styles from "../styles/TopArtists.module.css";
import ArtistsGrid from "../components/ArtistsGrid";

const TopArtists = () => {
  const [limit, setLimit] = useState(true);
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
    console.log(topArtists);
  }, [timeRange]);

  return (
    <main>
      <h2>Top artists this month</h2>
      <p>Only visible to you</p>
      <ul className={styles.topArtists}>
        {topArtists && <ArtistsGrid artists={topArtists.items}/>}
      </ul>
    </main>
  );
};

export default TopArtists;
