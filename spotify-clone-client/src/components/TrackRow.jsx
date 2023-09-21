import { useState } from "react"

const TrackRow = ({ track }) => {
    const [artists, setArtists] = useState(null)

    const extractArtist = (artists) => {
        for (const artist in artists) {
            return artists[artist].name
        }
    }

    const artistList = extractArtist(track.artists)

    console.log(track.artists);

    return (
        <tr>
            <td>{track.track_number}</td>
            <td>{track.name}</td>
            {/* <td>{track.artists}</td> */}
        </tr>
    )
}

export default TrackRow