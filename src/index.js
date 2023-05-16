import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import firebase, {auth} from './firebase.js';
import Button from '@mui/material/Button';
import { Box, Container, createTheme, ThemeProvider } from '@mui/material';


class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null}
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if(user){
        this.setState({user});
      }
    })
  }
  logOutUser = () => {
    firebase.auth().signOut()
    .then(window.location = "/");
  }
  render() {
    return (
      <Container>
      <Router>
        <div className="app">
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            {!this.state.user &&
              <div>
                <Button variant="outlined" sx={{ m: 2 }}>
                    <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                </Button>
                <Button variant="outlined">
                    <Link to="/register" style={{ textDecoration: 'none' }}>Register</Link>
                </Button>
              </div>
            }
            {this.state.user &&
                <Button href="#!" onClick={this.logOutUser} variant="outlined" sx={{ m: 2 }}>Log out</Button>
            }
          </Box>
          <Switch>
            <Route path="/" exact render={() => <App user ={this.state.user}/>} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </div>
      </Router>
      </Container>
    );
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: "#eeeeee",
    },
    primary: {
      main: "#304896",
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppRouter>
    <ThemeProvider theme={theme}>      
    </ThemeProvider>
    </AppRouter>
  );

export default theme;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
