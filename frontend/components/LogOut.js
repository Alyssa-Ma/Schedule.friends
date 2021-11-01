import React, {useContext, useEffect} from 'react';
import UserContext from '../context/UserContext';

const LogOut = () => {
    const context = useContext(UserContext);

    useEffect(() => {
        context.setUser({});
    },[]);
    
    return (
        <React.Fragment>

        </React.Fragment>
    )
}

export default LogOut;
