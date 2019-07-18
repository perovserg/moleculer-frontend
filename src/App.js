import React, { useContext, useReducer }  from 'react';

import socketIOClient from "socket.io-client";

import Context from './context';
import reducer from './reducer';

import config from './config.json';

import withRoot from './withRoot';

import Header from './components/Header';
import MemberList from './components/MemberList';
import AddMemberPopper from './components/AddMemberPopper';
import AddDistancePopper from './components/AddDistancePopper';


const socket = socketIOClient(config.BACKEND_URL);

const App = () => {

    const initialState = useContext(Context);

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{state, dispatch, socket}}>
            <Header/>
            <MemberList/>
            <AddMemberPopper/>
            <AddDistancePopper/>
        </Context.Provider>
    );
};

export default withRoot(App);
