import {
    FETCH_MEMBERS_REQUEST,
    FETCH_MEMBERS_FAILURE,
    FETCH_MEMBERS_SUCCESS,
} from './eventTypes';

export default function reducer(state, { type, payload}) {

    switch (type) {

        case FETCH_MEMBERS_REQUEST:
            return {
                ...state,
                members: [],
                isLoading: true,
                isLoaded: false,
                loadingError: null,
            };

        case FETCH_MEMBERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                loadingError: payload,
            };

        case FETCH_MEMBERS_SUCCESS:
            return {
                ...state,
                members: payload,
                isLoading: false,
                isLoaded: true,
                loadingError: null,
            };

        default:
            return state;
    }

};
