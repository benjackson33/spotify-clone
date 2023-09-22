import axios from "axios";
import { useEffect, useState } from "react";
import { getTopTracks } from "../utils/spotifyConfig";
import TrackCard from "./TrackCard";
import styles from "../styles/TopTracks.module.css";
import TrackRow from "./TrackRow";

const TopTracks = ({ token }) => {
    const [topTracks, setTopTracks] = useState(null);
    const [timeRange, setTimeRange] = useState("short_term");
    //         |
    // https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    // Available timeRange options:
    // short_term || medium_term || long_term

    useEffect(() => {
        const fetchTopTracksData = async () => {
            try {
                const { data } = await getTopTracks(timeRange);
                setTopTracks(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchTopTracksData();
    }, [token]);

    useEffect(() => {
        console.log(topTracks);
    }, [topTracks]);

    return (
        <>
            <h1>Spotify Top Tracks</h1>
            {topTracks && (
                // <ul className={styles.cards}>
                <table>
                    <tbody>
                        {topTracks &&
                            topTracks.items.map((track) => (
                                <TrackRow track={track} />
                                // <TrackCard key={track.id} track={track} />
                            ))}
                    </tbody>
                </table>
                // </ul>
            )}
        </>
    );
};

export default TopTracks;
