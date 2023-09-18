import timeConversion from "../utils/timeConversion";

const TrackCard = ({ track }) => {
  return (
    <div className="card">
      <h3>Name: {track.name}</h3>
      <p>Duration: {timeConversion(track.duration_ms)}</p>
    </div>
  );
};

export default TrackCard;
