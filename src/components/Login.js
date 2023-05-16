import React from 'react';
import firebase from '../firebase.js';
import { Link } from 'react-router-dom';
import theme from '../index.js';
import { Button, ThemeProvider, Typography } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
        };
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({error});
        });
    }

    render(){
        const {email, password, error} = this.state;
        return(
            <ThemeProvider theme={theme}>
                <CssBaseline />
            <div className="auth-container">
                <Typography variant="h1" sx={{ mt: 10, mb: 5, color: "primary.main" }}>
                    Log in to your account
                </Typography>
                <Typography sx={{ lineHeight: '2' }}>
                    Login to access your account
                {error && <p className="error-message">{error.message}</p>}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email" style={{ marginRight: 10 }}>Email address</label>
                        <input type="text" name="email" id="email" value={email} onChange={this.handleChange}></input><br />
                    <label htmlFor="password" style={{ marginRight: 10 }}>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={this.handleChange}
                        >
                    </input><br />
                        <Button type="submit" variant="outlined" sx={{ my: 2 }}>Login</Button>
                    <p>Don't have an account? <Link className="login-btn" to="/register">Register here</Link></p>
                </form>
                </Typography>
            </div>
            </ThemeProvider>
        )
    }
}

export default Login;