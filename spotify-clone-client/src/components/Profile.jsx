const Profile = ({ profile }) => {
    return (
        <>
            <h1>Spotify Profile</h1>
            <ul>
                <img src={profile.images[1].url} alt="" />
                <li>{profile.display_name}</li>
                <li>{profile.email}</li>
                <li>{profile.id}</li>
            </ul>
        </>
    );
};

export default Profile;
