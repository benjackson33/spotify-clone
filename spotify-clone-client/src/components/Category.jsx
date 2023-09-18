import { useEffect, useState } from "react";
import axios from "axios";
import spotifySearchConfig from "../utils/spotifySearchConfig";

const Category = ({ token }) => {
  const [categories, setCategories] = useState(null);

  const getCategories = () => {
    return axios.get(`https://api.spotify.com/v1/browse/categories`, {
      header: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const { data } = await getCategories();
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategoriesData();
  }, [token]);

  return (
    <div className="category">
      <h1>Categories</h1>
    </div>
  );
};

export default Category;
