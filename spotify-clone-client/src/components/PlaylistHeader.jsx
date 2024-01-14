import { useState, useEffect } from "react";
import styles from "../styles/PlaylistHeader.module.css";

const PlaylistHeader = ({ playlist }) => {
  const [description, setDescription] = useState(true);

  useEffect(() => {
    if (playlist && playlist.description) {
      if (playlist.description.includes("<a href=spotify")) {
        setDescription(true);
      } else {
        setDescription(false);
      }
    } else {
      setDescription(false);
    }
  }, [playlist]);

  if (
    !playlist ||
    !playlist.owner ||
    !playlist.name ||
    !playlist.images ||
    !playlist.description ||
    !playlist.images.length
  ) {
    return null; // or render a placeholder/error message
  }

  const { name, images, owner, tracks, public: isPublic } = playlist;
  const playlistName = name;
  const playlistImage = images[0].url;
  const playlistOwner = owner.display_name;
  const trackNum = tracks.total;

  return (
    <>
      <div className={styles.headerWrapper}>
        <img className={styles.headerImg} src={playlistImage} alt="" />
        <div className={styles.playlistDetails}>
          <p>{!isPublic ? "Public Playlist" : "Private Playlist"}</p>
          <h1>{playlistName}</h1>
          {description ? (
            <p dangerouslySetInnerHTML={{ __html: playlist.description }} />
          ) : (
            <p>{playlist.description}</p>
          )}
          <p>
            <a href={owner.external_urls}>{playlistOwner}</a> {trackNum} • songs
          </p>
        </div>
      </div>
    </>
  );
};

export default PlaylistHeader;
