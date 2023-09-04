const CurrentlyPlaying = ({ currentlyPlaying }) => {
    const { item } = currentlyPlaying;
    const { id, images, name } = item.artists[0]

    return (
        <>
            <h1>Currently Playing:</h1>
            <img src={item.album.images[1].url} />
            <p>Song Title: {item.name}</p>
            <p>Artist: {name}</p>
            <audio controls src={item.preview_url}>Preview</audio>
        </>
    );
};

export default CurrentlyPlaying;
