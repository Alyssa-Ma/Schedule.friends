import React, {createContext} from 'react';

const UserContext = createContext({
    user: {},
    isSignedIn: false,
    setUser: (userObj) => {},
    setIsSignedIn: (bool) => {},
    fetchUserToken: (userName, passWord) => {}
});

export default UserContext;
