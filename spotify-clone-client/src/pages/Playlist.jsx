import { useParams } from "react-router-dom";
import { getPlaylist } from "../utils/spotifyConfig";
import { useEffect, useState } from "react";
import TrackRow from "../components/TrackRow";
import PlaylistHeader from "../components/PlaylistHeader";

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  // console.log(playlist);

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
    <PlaylistHeader playlist={playlist} />
      {playlist && (
        // <ul className={styles.cards}>
        <table cellPadding={5}>
          <tbody>
            {playlist &&
              playlist.tracks.items.map((track, i) => (
                // <img src={track.track.album.images[0].url} alt="" />
                <TrackRow key={i} track={track.track} trackNumber={i + 1} />
              ))}
          </tbody>
        </table>
        // </ul>
      )}
    </>
  );
};

export default Playlist;
