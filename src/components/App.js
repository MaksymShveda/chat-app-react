import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import './App.css';
import { connect } from 'react-redux';


import ColorPanel from './ColorPanel/colorpanel';
import SidePanel from './SidePanel/sidepanel';
import Messages from './Messages/messages';
import MetaPanel from './MetaPanel/metapanel';


const App = ({currentUser, currentChannel, isPrivateChannel})=> (
  <Grid columns="equal" className="app" style={{background:'#eee'}}>
    <ColorPanel/>
    <SidePanel 
    key={currentUser && currentUser.uid}
    currentUser={currentUser}/>
    <GridColumn style={{marginLeft:320}}>
      <Messages 
      key={currentChannel && currentChannel.id}
      currentChannel={currentChannel}
      currentUser={currentUser}
      isPrivateChannel={isPrivateChannel}
      />
      </GridColumn>
    <GridColumn width={4}>
    <MetaPanel/>
    </GridColumn>

  </Grid>
  );

  const mapStateToProps = state =>({
    currentUser: state.user.currentUser, 
    currentChannel : state.channel.currentChannel,
    isPrivateChannel: state.channel.isPrivateChannel
  })

export default connect(mapStateToProps)(App);
