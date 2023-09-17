import axios from "axios";
import { useEffect, useState } from "react";

const TopTracks = ({ token }) => {
  const [topTracks, setTopTracks] = useState(null);

  const getTopTracks = () => {
    return axios.get(
      `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  useEffect(() => {
    const setTopTracksData = async () => {
      try {
        const { data } = await getTopTracks();
        setTopTracks(data)
      } catch (err) {
        console.log(err);
      }
    };

    setTopTracksData()
  }, [token]);

  console.log(topTracks);

  return (
    <>
      <h1>Spotify Top Tracks</h1>
      {topTracks && (
        <>
          <h3>Test</h3>
        </>
      )}
    </>
  )
};

export default TopTracks