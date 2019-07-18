import React, {useContext} from 'react';

import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

import AddMemberForm from './AddMemberForm';

import Context from "../context";

import {CLOSE_ADD_MEMBER_POPPER} from '../eventTypes';


const AddMemberPopper = ({ classes }) => {

    const { state, dispatch } = useContext(Context);

    const { open, anchorEl, placement } = state.addMemberPopper;

    const handleClickClose = () => {
        dispatch({type: CLOSE_ADD_MEMBER_POPPER});
    };

    return (
        <div className={classes.root}>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                            <AddMemberForm handleClickClose={handleClickClose}/>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </div>
    );
};

const styles = {
    root: {
        width: 500,
    },
};

export default withStyles(styles)(AddMemberPopper);
