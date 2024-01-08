import { useState, useEffect } from "react";
import { getDevice } from "../utils/spotifyConfig";

// https://developer.spotify.com/documentation/web-playback-sdk/howtos/web-app-player

const Player = ({ token }) => {
  // console.log(token);
  const [devices, setDevices] = useState("");

  useEffect(() => {
    const fetchUserDevices = async () => {
      try {
        const { data } = await getDevice();
        // console.log(data);
        setDevices(data);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchUserDevices();
  }, [token]);

  return <></>;
};

export default Player;
