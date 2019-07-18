import { createContext } from 'react';

const appContext = createContext({
    totalDistance: null,
    members: [],
    isLoading: false,
    isLoaded: false,
    loadingError: null,
    addMemberPopper: {
        open: false,
        anchorEl: null,
        placement: null,
    },
    addDistancePopper: {
        open: false,
        anchorEl: null,
        placement: null,
    },
});

export default appContext;
