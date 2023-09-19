import timeConversion from "../utils/timeConversion";
import styles from "./TrackCard.module.css"

const TrackCard = ({ track }) => {
    return (
        <li className={styles.card}>
            <img src={track.album.images[0].url} alt="" />
            <h3>Name: {track.name}</h3>
            <p>Duration: {timeConversion(track.duration_ms)}</p>
        </li>
    );
};

export default TrackCard;
