import React from 'react';
/* import './App.css'; */
import Chatbox from './components/Chatbox';
import {Link} from 'react-router-dom';
import firebase from './firebase';
import { Box, Typography } from '@mui/material';
import theme from './index.js';
import { ThemeProvider } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if(this.state.message !== ''){
      const chatRef = firebase.database().ref('general');
      const chat = {
        message: this.state.message,
        user: this.props.user.displayName,
        timestamp: new Date().getTime()
      }

      chatRef.push(chat);
      this.setState({message: ''});
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <div className="App">
        <Typography variant="h1" sx={{ mt: 10, mb: 5, textAlign: "center", color: "primary.main"}}>
            Chat App
        </Typography>
        {this.props.user && 
          <div className="allow-chat">
            <Chatbox />
            <Box sx={{ display: "flex", justifyContent: "center", my: 2}}>
              <form className="message-form" onSubmit={this.onSubmit}>
              <input
                type="text"
                name="message"
                id="message"
                value={this.state.message}
                placeholder="Enter a message..."
                onChange={this.onChange} />
              <button>Send</button>
              </form>
            </Box>
          </div>
        }
        {!this.props.user &&
          <div className="disallow-chat">
            <Typography sx={{ textAlign: "center" }}>
              <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to start chatting!
            </Typography>
          </div>
        }
      </div>
      </ThemeProvider>
    );
  }
}

export default App;
