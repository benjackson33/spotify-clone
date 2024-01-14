import ArtistCard from "../components/ArtistCard";

const ArtistsGrid = ({ artists }) => {
  return (
    <>
      {artists.map((artist, i) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </>
  );
};

export default ArtistsGrid;
