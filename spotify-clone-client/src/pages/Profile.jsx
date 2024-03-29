import axios from "axios";
import { useEffect, useState } from "react";
import { getUsersTopItems, spotifyLogo } from "../utils/spotifyConfig";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";
import ArtistsGrid from "../components/ArtistsGrid";

const Profile = ({ token }) => {
  const [profile, setProfile] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [timeRange, setTimeRange] = useState("short_term");
  //         |
  // https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  // Available timeRange options:
  // short_term || medium_term || long_term

  // console.log(profile);

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

    const fetchTopArtistsData = async () => {
      try {
        const { data } = await getUsersTopItems("artists", timeRange);
        setTopArtists(data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchTopTracksData = async () => {
      try {
        const { data } = await getUsersTopItems("tracks", timeRange);
        setTopTracks(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfileData();
    fetchTopArtistsData();
    fetchTopTracksData();
  }, [token]);

  return (
    <>
      {profile && (
        <>
          <h1>Spotify Profile</h1>
          <ul>
            <img
              src={
                profile.images.length === 0
                  ? spotifyLogo
                  : profile.images[1].url
              }
              alt=""
            />
            <li>{profile.display_name}</li>
            <li>{profile.email}</li>
            <li>{profile.id}</li>
          </ul>
          <h2>Top artists this month</h2>
          <p>Only visible to you</p>
          {topArtists && (
            <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
          )}
          <TopTracks topTracks={topTracks} />
        </>
      )}
    </>
  );
};

export default Profile;
