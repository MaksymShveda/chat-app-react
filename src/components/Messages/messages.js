import React from "react";
import { connect } from "react-redux";
import { setUserPosts } from "../../actions";
import {Segment, Comment, Progress} from 'semantic-ui-react';
import MessagesHeader from "./messagesHeader";
import MessageForm from "./messageForm";
import Message from './message'
import firebase from '../../firebase'

class Messages extends React.Component{
    state ={
        messagesRef:firebase.database().ref('messages'),
        usersRef:firebase.database().ref('users'),
        channel:this.props.currentChannel,
        isChannelStarred:false,
        user:this.props.currentUser,
        messages:[],
        messagesLoading:true,
        progressBar: false,
        numberOfUniqueUsers: '',
        searchTerm: '',
        searchLoading: false,
        searchResults: [],
        privateChannel:this.props.isPrivateChannel,
        privateMessagesRef:firebase.database().ref('privateMessages')
    }

    componentDidMount(){
        const {channel, user} = this.state;

        if(channel && user){
            this.addListeners(channel.id);
            this.addUserStarsListener(channel.id, user.uid);
        }
    }

    addListeners = channelId =>{
        this.addMessageListener(channelId)
    }

    addMessageListener = channelId=>{
        let loadedMessages = [];
        const ref = this.getMessagesRef()
        ref.child(channelId).on('child_added', snap=>{
            loadedMessages.push(snap.val());
            this.setState({
                messages:loadedMessages,
                messagesLoading:false
            });
            this.countUniqueUsers(loadedMessages);
            this.countUserPosts(loadedMessages);
        });
    };

    addUserStarsListener = (channelId, userId) => {
        this.state.usersRef
        .child(userId)
        .child('starred')
        .once('value')
        .then(data => {
            if(data.val() !== null){
                const channelIds = Object.keys(data.val());
                const prevStarred = channelIds.includes(channelId);
                this.setState({isChannelStarred:prevStarred});
            }
        })
    }

    countUniqueUsers = messages => {
        const uniqueUsers = messages.reduce((acc, message)=>{
            if(!acc.includes(message.user.name)){
                acc.push(message.user.name);
            }
            return acc
        }, [])
        const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
        const numberOfUniqueUsers = `${uniqueUsers.length} user${plural?'s': ''}`;
        this.setState({numberOfUniqueUsers})
    }

    countUserPosts = messages => {
        let userPosts = messages.reduce((acc, message)=>{
            if(message.user.name in acc){
                acc[message.user.name].count +=1;
            }
            else {
                acc[message.user.name] = {
                    avatar: message.user.avatar,
                    count:1
                }
            }
            return acc;
        },{});
        this.props.setUserPosts(userPosts);
    }

    displayMessages = messages =>
        messages.length>0 &&messages.map(message=>(
            <Message
            key={message.timestamp}
            message={message}
            user={this.state.user}
            />
        ))
    
        isProgressBarVisible = percent => {
            if(percent >0){
                this.setState({progressBar: true})
            }
        };

        handleChange = event => {
            this.setState({
                searchTerm: event.target.value,
                searchLoading: true
            },() => this.handleSearchMessages())
        }

        handleStar = () => {
            this.setState(prevState => ({
                isChannelStarred: !prevState.isChannelStarred
            }),()=>this.starChannel())
        }

        starChannel = () =>{
            if(this.state.isChannelStarred){
                this.state.usersRef
                .child(`${this.state.user.uid}/starred`)
                .update({
                    [this.state.channel.id]:{
                        name:this.state.channel.name,
                        details:this.state.channel.details,
                        createdBy:{
                            name:this.state.channel.createdBy.name,
                            avatar:this.state.channel.createdBy.avatar
                        }
                    }
                })
            }
            else{
                this.state.usersRef
                .child(`${this.state.user.uid}/starred`)
                .child(this.state.channel.id)
                .remove(err => {
                    if(err !== null){
                        console.error(err);
                    }
                });
            }
        };



        handleSearchMessages = () => {
            const channelMessages = [...this.state.messages];
            const regex = new RegExp(this.state.searchTerm, 'gi');
            const searchResults = channelMessages.reduce((acc, message)=>{
                if(message.content && message.content.match(regex) || message.user.name.match(regex)){
                    acc.push(message);
                }
                return acc;
            },[])
            this.setState({searchResults});
            setTimeout(()=>this.setState({searchLoading:false}), 500)
        }

        getMessagesRef = () =>{
            const {messagesRef, privateMessagesRef, privateChannel} = this.state;
            return privateChannel ? privateMessagesRef : messagesRef;
        }

        displayChannelName = channel => {
            return channel ? `${this.state.privateChannel ? `@`:'#'}${channel.name}`:
            '';
        }

    render(){
        const {privateChannel, messagesRef, messages, channel, user, progressBar, numberOfUniqueUsers, searchResults, searchTerm, searchLoading, isChannelStarred} = this.state
        return (
            <React.Fragment>
                <MessagesHeader
                channelName={this.displayChannelName(channel)}
                numberOfUniqueUsers={numberOfUniqueUsers}
                handleChange={this.handleChange}
                searchLoading={searchLoading}
                isPrivateChannel={privateChannel}
                handleStar={this.handleStar}
                isChannelStarred={isChannelStarred}
                />
                <Segment>
                    <Comment.Group className={progressBar ? 'messages__progress':'messages'}>
                     {searchTerm ? this.displayMessages(searchResults):this.displayMessages(messages)} 
                    </Comment.Group>  
                </Segment>
                <MessageForm
                messagesRef={messagesRef}
                currentChannel={channel}
                currentUser={user}
                isPrivateChannel={privateChannel}
                getMessagesRef={this.getMessagesRef}
                isProgressBarVisible={this.isProgressBarVisible}
                />
            </React.Fragment>
        )
    }
}


export default connect(null, {setUserPosts})(Messages);