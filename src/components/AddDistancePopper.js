import React, {useContext} from 'react';

import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

import AddDistanceForm from './AddDistanceForm';

import Context from "../context";

import { CLOSE_ADD_DISTANCE_POPPER } from '../eventTypes';


const AddDistancePopper = ({ classes }) => {

    const { state, dispatch } = useContext(Context);

    const { open, anchorEl, placement, memberId } = state.addDistancePopper;

    const handleClickClose = () => {
        dispatch({type: CLOSE_ADD_DISTANCE_POPPER});
    };

    return (
        <div className={classes.root}>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                            <AddDistanceForm handleClickClose={handleClickClose} memberId={memberId}/>
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

export default withStyles(styles)(AddDistancePopper);
