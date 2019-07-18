import React from 'react';
import axios from 'axios';

import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import config from "../config";

const initState = {
    name: '',
    email: '',
    distance: '',
    avatar: '',
    errors: {
        name: '',
        email: '',
        distance: '',
        avatar: '',
    }
};

const postMember = async (member) => {
    try{
        await axios.post(`${config.BACKEND_URL}/member`,{...member});
    } catch (error) {
        console.error(error);
        if (error.response) console.log(`Error message: ${error.response.data}`);
    }
};

class AddMemberForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...initState};
    }

    async handleClickAdd(handleClickClose) {
        const errors = {};

        if (!this.state.name) errors.name = 'name is required';
        if (!this.state.email) errors.email = 'email is required';

        if (errors.name || errors.email) {
            this.setState({ errors });
            return;
        }

        await postMember({
            name: this.state.name,
            email: this.state.email,
            distance: this.state.distance,
            avatar: this.state.avatar,
        });

        this.setState({...initState});

        handleClickClose();
    }

    render() {

        const { classes, handleClickClose } = this.props;

        return (
            <div className={classes.root}>
                <TextField
                    id="name"
                    label="Name"
                    placeholder="type name here"
                    className={classes.textField}
                    error={!!this.state.errors.name}
                    helperText={this.state.errors.name}
                    onChange={event => this.setState({name: event.target.value})}
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    id="email"
                    label="Email"
                    placeholder="type email here"
                    type="email"
                    className={classes.textField}
                    error={!!this.state.errors.email}
                    helperText={this.state.errors.email}
                    onChange={event => this.setState({email: event.target.value})}
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    id="distance"
                    label="Distance"
                    placeholder="type distance here"
                    className={classes.textField}
                    error={!!this.state.errors.distance}
                    helperText={this.state.errors.distance}
                    onChange={event => this.setState({distance: event.target.value})}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="avatar"
                    label="Avatar"
                    placeholder="type avatar url here"
                    className={classes.textField}
                    error={!!this.state.errors.avatar}
                    helperText={this.state.errors.avatar}
                    onChange={event => this.setState({avatar: event.target.value})}
                    margin="normal"
                    fullWidth
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
        width: 400,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
});

export default withStyles(styles)(AddMemberForm);
