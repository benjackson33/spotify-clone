import { useState } from "react";
import ArtistSearch from "./ArtistSearch";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log(searchInput);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={searchInput}
      />
      <div className="artist">
      <ArtistSearch searchInput={searchInput} />
    </div>
    </>
  );
};

export default Search;
