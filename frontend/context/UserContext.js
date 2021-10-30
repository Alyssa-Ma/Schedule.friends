import React, {createContext} from 'react';

const UserContext = createContext({
    user: {},
    setUser: (userObj) => {},
    fetchToken: (userName, passWord) => {}
});

export default UserContext;
