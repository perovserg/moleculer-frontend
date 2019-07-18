import React from 'react';
import axios from 'axios';

import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import config from "../config";

const initState = {
    distance: '',
    errors: {
        distance: '',
    }
};

const incrementDistance = async (distance, memberId) => {
    try{
        await axios.put(`${config.BACKEND_URL}/member/${memberId}/incrementDistance`,{distance});
    } catch (error) {
        console.error(error);
        if (error.response) console.log(`Error message: ${error.response.data}`);
    }
};

class AddDistanceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...initState};
    }

    async handleClickAdd(handleClickClose) {
        const errors = {};

        if (!this.state.distance) errors.distance = 'distance is required';
        if (!/^[0-9]+$/.test(this.state.distance)) errors.distance = '(Allowed input:0-9)';
        if (errors.distance) {
            this.setState({ errors });
            return;
        }

        await incrementDistance(this.state.distance, this.props.memberId);

        this.setState({...initState});

        handleClickClose();
    }

    render() {

        const { classes, handleClickClose } = this.props;

        return (
            <div className={classes.root}>
                <TextField
                    id="distance"
                    label="Distance"
                    placeholder="type distance here"
                    className={classes.textField}
                    error={!!this.state.errors.distance}
                    helperText={this.state.errors.distance}
                    onChange={event => this.setState({distance: event.target.value})}
                    margin="normal"
                    required
                />
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => this.handleClickAdd(handleClickClose)}
                    >
                        Add
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={() => handleClickClose()}
                    >
                        Close
                    </Button>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: 200,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
});

export default withStyles(styles)(AddDistanceForm);
