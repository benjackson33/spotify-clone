import { useEffect, useState } from "react";
import timeConversion from "../utils/timeConversion";
import styles from "../styles/TrackRow.module.css";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const TrackRow = ({ track, trackNumber }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
 

      <tr onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <th rowSpan={2} className={styles.trackNumber}>
          {isHovered ? (
            <PlayArrowIcon />
          ) : (
            trackNumber
          )}
        </th>
        <td rowSpan={2}>
          <img src={track.album.images[2] ? track.album.images[2].url : track.album.images[0].url} alt="" />
        </td>
        <td id={track.id}>{track.name}</td>
        <td rowSpan={2}>{track.album.name}</td>
        <td rowSpan={2}>{timeConversion(track.duration_ms)}</td>
      </tr>
      <tr>
        <td>
          {track.artists.map((artist, i) => (
            <span key={i}>
              {artist.name}
              {i !== track.artists.length - 1 && ", "}
            </span>
          ))}
        </td>
      </tr>
    </>
  );
};

export default TrackRow;
