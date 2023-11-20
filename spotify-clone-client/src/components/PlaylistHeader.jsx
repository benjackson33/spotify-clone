import styles from "../styles/PlaylistHeader.module.css";

const PlaylistHeader = ({ playlist }) => {
  if (
    !playlist ||
    !playlist.owner ||
    !playlist.name ||
    !playlist.images ||
    !playlist.images.length
  ) {
    return null; // or render a placeholder/error message
  }

  const { name, images, owner } = playlist;
  const playlistName = name;
  const playlistImage = images[0].url;
  const playlistOwner = owner.display_name;

  // console.log(owner);

  return (
    <>
      <div className={styles.headerWrapper}>
        <img className={styles.headerImg} src={playlistImage} alt="" />
        <h1>{playlistName}</h1>
        <div className={styles.playlistTitle}>
          <p>{playlistOwner}</p>
        </div>
      </div>
    </>
  );
};

export default PlaylistHeader;
