const Logout = () => {
    const localStorage = window.localStorage;

    const logout = () => {
        if (localStorage.length > 0) {
            for (const item in localStorage) {
                window.localStorage.removeItem(item)
            }
        }
        
    }

    return <button onClick={logout} >Logout</button>;
};

export default Logout;
