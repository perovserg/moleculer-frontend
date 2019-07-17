import { createContext } from 'react';

const appContext = createContext({
    totalDistance: null,
    members: [],
    isLoading: false,
    isLoaded: false,
    loadingError: null,
    currentMember: null,
});

export default appContext;
