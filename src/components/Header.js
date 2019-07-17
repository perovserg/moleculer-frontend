import React, {useContext, useEffect} from "react";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PoolIcon from "@material-ui/icons/Pool";
import FlagIcon from "@material-ui/icons/Flag";
import Typography from "@material-ui/core/Typography";
import purple from "@material-ui/core/colors/purple";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import Context from '../context';
import axios from "axios";
import config from "../config";

import {GET_TOTAL_DISTANCE} from "../eventTypes";

const Header = ({ classes }) => {

  const mobileSize = useMediaQuery('(max-width: 650px)');

  const { state, dispatch } = useContext(Context);

  const { totalDistance } = state;

  useEffect(() => { getTotalDistance(); }, [totalDistance]);

  const getTotalDistance = async () => {
    try {
      const response =  await axios.get(`${config.BACKEND_URL}/totalDistance`);
      dispatch({ type: GET_TOTAL_DISTANCE, payload: response.data.totalDistance});
    } catch (e) {
      console.error(e);
    }
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
});

export default withStyles(styles)(Header);
