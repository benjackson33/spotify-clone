import { useEffect, useState } from "react";
import timeConversion from "../utils/timeConversion";

const TrackRow = ({ track }) => {
    const [artists, setArtists] = useState(null);

    useEffect(() => {
        const extractArtist = (artistsArray) => {
            artistsArray.forEach((artist) => {});
        };
        extractArtist(track.artists);
        console.log(track.artists);
    }, []);

    return (
        <>
            <tr>
                <th rowSpan={2}>{track.track_number}</th>
                <td>{track.name}</td>
            </tr>
            <tr>
                <td>{track.artists[0].name}</td>
                <td>{timeConversion(track.duration_ms)}</td>
            </tr>
        </>
    );
};

export default TrackRow;
