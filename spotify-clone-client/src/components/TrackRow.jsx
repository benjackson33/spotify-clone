import { useEffect, useState } from "react";
import timeConversion from "../utils/timeConversion";
import styles from "../styles/TrackRow.module.css"

const TrackRow = ({ track, trackNumber }) => {
  return (
    <>
      <tr>
        <th rowSpan={2}>{trackNumber}</th>
        <td rowSpan={2}>
          <img src={track.album.images[2] ? track.album.images[2].url : track.album.images[0].url }  alt="" />
        </td>
        <td id={track.id} >{track.name}</td>
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
