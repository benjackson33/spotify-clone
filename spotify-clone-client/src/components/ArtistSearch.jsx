const ArtistSearch = ({ searchInput }) => {

    const Artist = ({ token }) => {
        const [artist, setArtist] = useState(null);
    
        const getArtist = () => {
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

    // 'https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album

    return (
        <>
        </>
    )
}

export default ArtistSearch