import { useState } from "react";
import ArtistSearch from "./ArtistSearch";

const Search = ({ token }) => {
  const [searchInput, setSearchInput] = useState("");
  // console.log(token);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    // console.log(searchInput);
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
      <ArtistSearch 
      searchInput={searchInput} 
      accessToken={token}
      
      />
    </div>
    </>
  );
};

export default Search;
