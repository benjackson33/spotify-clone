import { useParams } from "react-router-dom";
import { getPlaylist } from "../utils/spotifyConfig";
import { useEffect, useState } from "react";
import TrackRow from "../components/TrackRow";

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  console.log(playlist);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const { data } = await getPlaylist(id);
        setPlaylist(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaylistData();
  }, []);

  return (
    <>
      {playlist && (
        // <ul className={styles.cards}>
        <table cellPadding={5}>
          <tbody>
            {playlist &&
              playlist.tracks.items.map((track, i) => (
                <TrackRow key={i} track={track} trackNumber={i + 1} />
              ))}
          </tbody>
        </table>
        // </ul>
      )}
    </>
  );
};

export default Playlist;
