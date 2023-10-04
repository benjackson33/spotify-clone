import axios from "axios";
import { useEffect, useState } from "react";
import { getUsersTopItems } from "../utils/spotifyConfig";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";

const Profile = ({ token }) => {
  const [profile, setProfile] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [timeRange, setTimeRange] = useState("short_term");
  //         |
  // https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  // Available timeRange options:
  // short_term || medium_term || long_term

  const getProfile = () => {
    return axios.get(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await getProfile();
        setProfile(data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchTopTracksData = async () => {
      try {
        const { data } = await getUsersTopItems(timeRange);
        setTopTracks(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfileData();
    fetchTopTracksData();
  }, [token]);

  return (
    <>
      {profile && (
        <>
          <h1>Spotify Profile</h1>
          <ul>
            <img src={profile.images[1].url} alt="" />
            <li>{profile.display_name}</li>
            <li>{profile.email}</li>
            <li>{profile.id}</li>
          </ul>
          <TopArtists token={token} />
          <TopTracks topTracks={topTracks} />
        </>
      )}
    </>
  );
};

export default Profile;
