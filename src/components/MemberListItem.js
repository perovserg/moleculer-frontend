import React, {useContext} from "react";

import { withStyles } from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Fab from '@material-ui/core/Fab';
import PlusOneIcon from '@material-ui/icons/PlusOne';

import {OPEN_ADD_DISTANCE_POPPER} from "../eventTypes";
import Context from "../context";


const MemberListItem = ({ classes, member }) => {

    const { dispatch } = useContext(Context);

    const handleClickAddDistanceButton = (e, memberId) => {
        dispatch({ type: OPEN_ADD_DISTANCE_POPPER, payload: {anchorEl: e.currentTarget, placement: 'left', memberId}});
    };

    return(
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={member.name} src={member.avatar} />
            </ListItemAvatar>
            <ListItemText
                primary={member.name}
                secondary={member.email}
            />
            <Typography>distance: {member.distance}</Typography>
            <Fab
                size="small"
                color="primary"
                aria-label="Add"
                className={classes.fab}
                onClick={event => handleClickAddDistanceButton(event, member._id)}
            >
                <PlusOneIcon className={classes.icon}/>
            </Fab>
        </ListItem>
    );
};

const styles = theme => ({
    fab: {
        margin: theme.spacing(1),
    },
});

export default withStyles(styles)(MemberListItem);
