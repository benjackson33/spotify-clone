const Profile = ({ profile }) => {
  return (
    <>
      <h1>Display your Spotify profile data</h1>
      <section id="profile">
        <h2>
          Logged in as <span id="displayName"></span>
        </h2>
        <img src={profile.images[1].url}></img>
        <span id="avatar"></span>
        <ul>
          <li>
            User ID: <span id="id">{profile.display_name}</span>
          </li>
          <li>
            Email: <span id="email">{profile.email}</span>
          </li>
          <li>
            Spotify URI:{" "}
            <a id="uri" href={profile.uri}>
              {profile.uri}
            </a>
          </li>
          <li>
            Link: <a id="url" href="#"></a>
          </li>
          <li>
            Profile Image:{" "}
            <span id="imgUrl">
              {profile.images.length === 0
                ? "No profile image"
                : profile.images.map((image) => {
                    <img src=""></img>;
                  })}
            </span>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Profile;
