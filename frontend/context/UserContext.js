import React, {createContext} from 'react';

const UserContext = createContext({
    user: {},
    setUser: (userObj) => {},
    fetchUserToken: (userName, passWord) => {}
});

export default UserContext;
