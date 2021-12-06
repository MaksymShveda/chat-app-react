import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import './App.css';
import { connect } from 'react-redux';


import ColorPanel from './ColorPanel/colorpanel';
import SidePanel from './SidePanel/sidepanel';
import Messages from './Messages/messages';
import MetaPanel from './MetaPanel/metapanel';


const App = ({currentUser})=> (
  <Grid columns="equal" className="app" style={{background:'#eee'}}>
    <ColorPanel/>
    <SidePanel currentUser={currentUser}/>
    <GridColumn style={{marginLeft:320}}>
      <Messages/>
      </GridColumn>
    <GridColumn width={4}>
    <MetaPanel/>
    </GridColumn>

  </Grid>
  );

  const mapStateToProps = state =>({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(App);
