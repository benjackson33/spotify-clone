import axios from "axios";
import { useEffect, useState } from "react";
import { getTopTracks } from "../utils/spotifyConfig";
import TrackCard from "../components/TrackCard";
import styles from "../styles/TopTracks.module.css";
import TrackRow from "../components/TrackRow";

const TopTracks = ({ token }) => {
  const [topTracks, setTopTracks] = useState(null);
  const [timeRange, setTimeRange] = useState("short_term");
  //         |
  // https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  // Available timeRange options:
  // short_term || medium_term || long_term

  useEffect(() => {
    const fetchTopTracksData = async () => {
      try {
        const { data } = await getTopTracks(timeRange);
        setTopTracks(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTopTracksData();
  }, [token]);

  useEffect(() => {
    console.log(topTracks);
  }, [topTracks]);

  return (
    <>
      <h2>Top tracks this month</h2>
      <p>Only visible to you</p>
      {topTracks && (
        // <ul className={styles.cards}>
        <table cellPadding={5}>
          <tbody>
            {topTracks &&
              topTracks.items.map((track, i) => (
                <TrackRow key={i} track={track} trackNumber={i + 1} />
                // <TrackCard key={track.id} track={track} />
              ))}
          </tbody>
        </table>
        // </ul>
      )}
    </>
  );
};

export default TopTracks;
