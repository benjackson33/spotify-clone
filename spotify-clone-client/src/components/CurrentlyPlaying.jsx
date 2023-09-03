const CurrentlyPlaying = ({ currentlyPlaying }) => {
    const { item } = currentlyPlaying;
    const { id, name } = item.artists[0]

    return (
        <>
            <h1>Currently Playing:</h1>
            <p>Song Title: {item.name}</p>
            <p>Artist: {name}</p>
            <audio controls src={item.preview_url}>Preview</audio>
        </>
    );
};

export default CurrentlyPlaying;
