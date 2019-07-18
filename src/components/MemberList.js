import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";

import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import purple from '@material-ui/core/colors/purple';

import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

import Spinner from 'react-spinner-material';

import Context from '../context';
import config from '../config.json';

import MemberListItem from './MemberListItem';

import {
    FETCH_MEMBERS_REQUEST,
    FETCH_MEMBERS_FAILURE,
    FETCH_MEMBERS_SUCCESS,
} from '../eventTypes';

const socket = socketIOClient(config.BACKEND_URL);

const getMembers = async (dispatch) => {
    dispatch({ type: FETCH_MEMBERS_REQUEST });
    try {
        const response =  await axios.get(`${config.BACKEND_URL}/member/list`);
        dispatch({ type: FETCH_MEMBERS_SUCCESS, payload: response.data});
    } catch (e) {
        dispatch({ type: FETCH_MEMBERS_FAILURE, payload: e});
    }
};

const MemberList = ({ classes }) => {


    const mobileSize = useMediaQuery('(max-width: 650px)');

    const { state, dispatch } = useContext(Context);

    const { members, isLoaded, isLoading } = state;

    useEffect(() => {
        if(isLoaded === false && isLoading === false) getMembers(dispatch);
    }, [dispatch, isLoaded, isLoading]);

    socket.on("UPDATE_MEMBER_LIST", () => getMembers(dispatch));

    const listItems = members.map(member => (
        <div key={member._id}>
            <MemberListItem member={member}/>
            <Divider variant="inset" component="li" />
        </div>
    ));

    return (
        <div className={mobileSize ? classes.rootMobile : classes.root}>
            {state.isLoading
                ? <Spinner size={120} spinnerColor={purple[500]} />
                : <List className={classes.root}>{listItems}</List>
            }
        </div>
    );
};

const styles = theme => ({

    root: {
        width: '100%',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    rootMobile: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

export default withStyles(styles)(MemberList);
