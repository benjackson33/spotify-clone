import axios from "axios";
import { useEffect, useState } from "react";

const Profile = ({ token }) => {
  const [profile, setProfile] = useState(null);

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

    // ! If you have issues with the Axios calls, for now:
    // ! Save App.js after logging in.
    // fetchProfileData();
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
        </>
      )}
    </>
  );
};

export default Profile;
