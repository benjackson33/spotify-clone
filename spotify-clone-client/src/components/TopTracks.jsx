import axios from "axios";
import { useEffect, useState } from "react";
import TrackCard from "./TrackCard";

const TopTracks = ({ token }) => {
    const [topTracks, setTopTracks] = useState(null);
    const [timeRange, setTimeRange] = useState("short_term");
    //         |
    // https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    // Available timeRange options:
    // short_term || medium_term || long_term

    const getTopTracks = () => {
        return axios.get(
            `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    };

    useEffect(() => {
        const fetchTopTracksData = async () => {
            try {
                const { data } = await getTopTracks();
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
                <ul>
                    {topTracks &&
                        topTracks.items.map((track) => (
                            <TrackCard key={track.id} track={track} />
                        ))}
                </ul>
            )}
        </>
    );
};

export default TopTracks;
