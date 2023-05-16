import React from 'react';
import firebase from '../firebase.js';
import { Link } from 'react-router-dom';
import Login from './Login';
import theme from '../index.js';
import { Button, ThemeProvider, Typography } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: null
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        const {email, username, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            const user = firebase.auth().currentUser;
            user.updateProfile({displayName: username}).then(() => {
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({error});
            });
        })
        .catch(error => {
            this.setState({error});
        })
    }

    render() {
        const {email, username, password, error} = this.state;
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
            <div className="auth-container">
                    <Typography variant="h1" sx={{ mt: 10, mb: 5, color: "primary.main" }}>
                        Register your account
                    </Typography>
                    <Typography sx={{ lineHeight: '2' }}>
                {error && <p className="error-message">{error.message}</p>}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username" style={{ marginRight: 10 }}>Username</label>
                        <input type="text" name="username" id="username" value={username} onChange={this.handleChange}></input><br />
                    <label htmlFor="email" style={{ marginRight: 10 }}>Email address</label>
                        <input type="text" name="email" id="email" value={email} onChange={this.handleChange}></input><br />
                    <label htmlFor="password" style={{ marginRight: 10 }}>Choose a password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={this.handleChange}
                        >
                    </input><br />
                        <Button type="submit" variant="outlined" sx={{ my: 2 }}>Get started</Button>
                    <p>Already have an account? <Link className="login-btn" to="/login">Login here</Link></p>
                </form>
                </Typography>
            </div>
            </ThemeProvider>
        );
    }
}

export default Register;