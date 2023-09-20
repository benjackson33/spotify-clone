import { useEffect, useState } from "react";
import axios from "axios";

const ArtistSearch = ({ searchInput, accessToken }) => {
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const getArtist = async () => {
      try {
        const res = await axios.get(
          `https://api.spotify.com/v1/search?q=remaster%2520artist%3A${searchInput}&type=artist&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setArtist(res.data.artists.items);
        console.log(res.data.artists.items);
      } catch (err) {
        console.error(err);
      }
    };

    getArtist(); // Call the function to make the request
  }, [accessToken, searchInput]);

  //   useEffect(() => {
  //   console.log(artist);
  //   }, [artist]);

  return (
    <>
  {artist && (
  <div>
    {artist.map((item) => (
      <div key={item.id}>
        <div>{item.name}</div>
        {item.images.length > 0 && (
          <img src={item.images[0].url} />
        )}
      </div>
    ))}
  </div>
)}

    </>
  );
};

export default ArtistSearch;
