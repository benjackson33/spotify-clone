import { useEffect, useState } from "react";
import axios from "axios";
import spotifySearchConfig from "../utils/spotifySearchConfig";

const Category = ({ token }) => {
    const [categories, setCategories] = useState(null);

    const getCategories = () => {
        const res = axios.get(`https://api.spotify.com/v1/browse/categories`, {
            header: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res);
        return res;
    };

    useEffect(() => {
        console.log(token);
        const setData = async () => {
            try {
                const res = await axios.get(
                    `https://api.spotify.com/v1/browse/categories`,
                    {
                        header: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(res);
                const { data } = await getCategories()
                setCategories(data)
            } catch (err) {
                console.log(err);
            }
        };

        setData();
    }, []);

    return (
        <div className="category">
            <h1>Categories</h1>
        </div>
    );
};

export default Category;
