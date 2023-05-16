import React from 'react';
/* import './Chatbox.css'; */
import firebase from '../firebase';
import { Box, List, ListItem, Paper, Typography } from '@mui/material';

class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: []
        }
    }
    componentDidMount(){
        const chatRef = firebase.database().ref('general');
        chatRef.on('value', snapshot => {
            const getChats = snapshot.val();
            let ascChats = [];
            for(let chat in getChats){
                if(getChats[chat].message !== ''){
                    ascChats.push({
                        id: chat,
                        message: getChats[chat].message,
                        user: getChats[chat].user,
                        date: getChats[chat].timestamp
                    });
                }
            }
            const chats = ascChats.reverse();
            this.setState({chats});
        });
    }
    render() {
        return(
            <Paper elevation={4} sx={{ mx: "20%", p: 1 }}>
            <div className="chatbox">
                <List>
                    {this.state.chats.map(chat => {
                        const postDate = new Date(chat.date);
                        return(
                            <ListItem key={chat.id}>
                                <Typography sx={{ display: 'flex', width: 1, justifyContent: 'flex-start' }}>
                                    <Box sx={{ width: 50 }}><em>{postDate.getDate() + '/' + (postDate.getMonth()+1)}</em></Box>
                                    <Box sx={{ mr: 1 }}><strong>{chat.user}:</strong></Box>
                                    <Box>{chat.message}</Box>
                                </Typography>
                            </ListItem>
                        )
                    })}
                </List>
            </div>
            </Paper>
        );
    }
}

export default Chatbox;