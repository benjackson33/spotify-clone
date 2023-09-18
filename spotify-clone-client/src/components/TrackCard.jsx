import timeConversion from "../utils/timeConversion";

const TrackCard = ({ track }) => {
  return (
    <li className="card">
      <img src={track.album.images[0].url} alt="" />
      <h3>Name: {track.name}</h3>
      <p>Duration: {timeConversion(track.duration_ms)}</p>
    </li>
  );
};

export default TrackCard;
