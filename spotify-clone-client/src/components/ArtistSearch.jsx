const ArtistSearch = ({ searchInput }) => {

    const Artist = ({ token }) => {
        const [artist, setArtist] = useState(null);
    
        const getTopTracks = () => {
            return axios.get(
                `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        };

    }

    return (
        <>
        </>
    )
}

export default ArtistSearch