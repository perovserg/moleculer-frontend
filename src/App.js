import React, { useContext, useReducer }  from 'react';

import Context from './context';
import reducer from './reducer';

import withRoot from './withRoot';

import Header from './components/Header';
import MemberList from './components/MemberList';
import AddMemberPopper from './components/AddMemberPopper';

const App = () => {

    const initialState = useContext(Context);

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{state, dispatch}}>
            <Header/>
            <MemberList/>
            <AddMemberPopper/>
        </Context.Provider>
    );
};

export default withRoot(App);
