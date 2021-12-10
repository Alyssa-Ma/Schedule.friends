import React, {useContext, useEffect} from 'react';
import UserContext from '../context/UserContext';

const LogOut = ({navigation}) => {
    const context = useContext(UserContext);

    useEffect(() => {
        context.setUser({});
        context.setIsSignedIn(false);
        context.setIsDarkTheme(false);
    },[]);
    
    return (
        <React.Fragment>

        </React.Fragment>
    )
}

export default LogOut;
