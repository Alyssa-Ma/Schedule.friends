import {createContext} from 'react';

const SnackBarContext = createContext({
    snackVisible: false,
    statusText: "",
    setSnackVisible: (bool) => {},
    setStatusText: (string) => {},
    toggleSnackBar: (bool) => {},
    onDismissSnackBar: (bool) => {},
    trimJSONResponse: (string) => {}
});

export default SnackBarContext;
