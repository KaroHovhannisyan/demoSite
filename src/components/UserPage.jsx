import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {Button,
        Navbar,Nav,NavItem,NavDropdown,MenuItem,
        Modal,
       } from 'react-bootstrap';
import Avatar from 'material-ui/Avatar';
import LoginPage from './Login.jsx';
import RegisterPage from './RegisterForm.jsx';
import Settings from 'material-ui/svg-icons/action/build';
import Help from 'material-ui/svg-icons/action/help';
import Exit from 'material-ui/svg-icons/action/exit-to-app';

import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';



const style = {margin: 5};



class UserPage extends Component {
     constructor(props){
         super(props);
         this.state = {
             isLoggedIn : false,
             showLoginPage:false,
             showRegisterPage:false,
             username:"",
         }
     }
    openRegisterForm(){
        this.setState({showRegisterPage:true})
    }
    
    render(){
        if(!this.state.isLoggedIn){
            return(
             <NavDropdown eventKey={5} title="Մուտք" id="basic-nav-dropdown">
                   <MenuItem eventKey={5.1} onClick= {()=>{this.setState({showRegisterPage:true})}}  >Գրանցում</MenuItem>
                   <MenuItem eventKey={5.2} onClick= {()=>{this.setState({showLoginPage:true   })}} >Մուտք Գործել</MenuItem>
                    <LoginPage open = {this.state.showLoginPage} onRegistered={(name)=>this.setState({username:name,isLoggedIn:true})} onClose = {()=>{this.setState({showLoginPage:false})}} />
                    <RegisterPage open={this.state.showRegisterPage}  
                                  onClose = {()=>{this.setState({showRegisterPage:false,showLoginPage:false})}}
                                  onRegiter = {(username) =>{this.setState({isLoggedIn:true,username:username,showLoginPage:false,showRegisterPage:false})}}/ >
             </NavDropdown>) 
        }
        else{
            return(
            <NavDropdown eventKey={5} title="Իմ Էջը" id="basic-nav-dropdown">
               <MenuItem eventKey={5.1}  >
                   <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                       <List>
                         <ListItem
                             disabled={false}
                              leftAvatar={<Avatar size={40} >{this.state.username[0]}</Avatar>}>  {this.state.username}
                         </ListItem>                    
                            <Divider />
                           <ListItem primaryText="Կարգավորումներ" leftIcon={<Settings />} />
                           <ListItem primaryText="Օգնություն" leftIcon={<Help />} />
                           <ListItem onClick={()=>{this.setState({isLoggedIn:false,showLoginPage:false,showRegisterPage:false,username:""})}} primaryText="Դուրս գալ" leftIcon={<Exit />} />                
                       </List>   
                   </MuiThemeProvider>
               </MenuItem>
                    
            </NavDropdown>
            
            )
            
            }   
             }
    
    
}


export default UserPage;