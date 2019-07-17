import React from "react";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";


const MemberListItem = ({ member }) => (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar alt={member.name} src={member.avatar} />
        </ListItemAvatar>
        <ListItemText
            primary={member.name}
            secondary={member.email}
        />
        <Typography>distance: {member.distance}</Typography>
    </ListItem>
);

export default MemberListItem;
