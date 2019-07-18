import React, {useContext, useEffect} from "react";
import socketIOClient from "socket.io-client";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PoolIcon from "@material-ui/icons/Pool";
import FlagIcon from "@material-ui/icons/Flag";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import purple from "@material-ui/core/colors/purple";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import Context from '../context';
import axios from "axios";
import config from "../config";

import { GET_TOTAL_DISTANCE, OPEN_ADD_MEMBER_POPPER } from "../eventTypes";

const socket = socketIOClient(config.BACKEND_URL);

const getTotalDistance = async (dispatch) => {
  try {
    const response =  await axios.get(`${config.BACKEND_URL}/totalDistance`);
    dispatch({ type: GET_TOTAL_DISTANCE, payload: response.data.totalDistance});
  } catch (error) {
    console.error(error);
    if (error.response) console.log(`Error message: ${error.response.data}`);
  }
};

const Header = ({ classes }) => {

  const mobileSize = useMediaQuery('(max-width: 650px)');

  const { state, dispatch } = useContext(Context);

  const { totalDistance } = state;

  useEffect(() => { getTotalDistance(dispatch); }, [dispatch]);

  socket.on("UPDATE_MEMBER_LIST", () => getTotalDistance(dispatch));
  socket.on("UPDATE_TOTAL_DISTANCE", () => getTotalDistance(dispatch));

  const handleClickAddMemberButton = (e) => {
    dispatch({ type: OPEN_ADD_MEMBER_POPPER, payload: {anchorEl: e.currentTarget, placement: 'bottom-end'}});
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.grow}>
            <PoolIcon className={classes.icon}/>
            <Typography
              className={mobileSize ? classes.mobile : ''}
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
            >
              Moleculer frontend
            </Typography>
          </div>
          <div className={classes.grow}>
            <FlagIcon className={classes.icon}/>
            <Typography
              className={mobileSize ? classes.mobile : ''}
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
            >
              Total Distance:
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
            >
              {totalDistance}
            </Typography>
          </div>
          <Button
              variant="contained"
              className={classes.button}
              onClick={(e) => handleClickAddMemberButton(e)}
          >
            <PersonAddIcon className={classes.icon}/>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spacing.unit,
    color: purple[400],
    fontSize: 45
  },
  mobile: {
    display: "none"
  },
  fab: {
    margin: theme.spacing(1),
  },
});

export default withStyles(styles)(Header);
