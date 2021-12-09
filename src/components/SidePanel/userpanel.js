import React from "react";
import { Icon, GridColumn, GridRow, Grid, Header, Dropdown, Image } from "semantic-ui-react";
import firebase from '../../firebase'

class UserPanel extends React.Component{
    state={
        user:this.props.currentUser
    }

    
    componentWillReceiveProps

    dropdownOptions = () => [
        {
            key:"user",
            text:<span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: "avatar",
            text: <span>Change Avatar</span>
        },
        {
            key:"signout",
            text:<span onClick={this.handleSignout}>Sign Out</span>
        }
    ]

    handleSignout = () =>{
        firebase
            .auth()
            .signOut()
            .then(()=>console.log('signed out'))
    }

    render(){
        const {user} = this.state;
        const {primaryColor} = this.props;

        return(
            <Grid style={{background: primaryColor}}>
                <GridColumn>
                    <GridRow style={{padding:'1.2rem', margin:0}}>
                        <Header inverted floated="left" as="h2">
                            <Icon name="code"/>
                            <Header.Content>DevChat</Header.Content>
                        </Header>
                    </GridRow>
                    <Header style={{padding:'0.25rem'}} as="h4" inverted>
                        <Dropdown trigger={
                            <span>
                                <Image src={user.photoURL} spaced="right" avatar />
                                {user.displayName}
                            </span>
                        } options={this.dropdownOptions()} />
                    </Header>
                </GridColumn>
            </Grid>
        )
    }
}


export default UserPanel