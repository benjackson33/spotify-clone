import { useState, useEffect } from "react";
import styles from "../styles/TopArtists.module.css";
import { getPlaylists } from "../utils/spotifyConfig";
import PlaylistCard from "../components/PlaylistCard";


const Playlists = ({ token }) => {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      try {
        const { data } = await getPlaylists();
        setPlaylists(data.items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserPlaylists();
  }, [token]);

  useEffect(() => {
    console.log(playlists);
  }, [playlists]);



  return (
    <>
      <table  cellPadding={5}>
        <tbody >
          {playlists &&
            playlists.map((playlist) => (
              
              <PlaylistCard  key={playlist.id} playlist={playlist} />
              
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Playlists;
