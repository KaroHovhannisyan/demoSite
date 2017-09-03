import React from 'react';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import TextField from 'material-ui/TextField';
import {Button,
        Modal,
        Form ,FormGroup,ControlLabel,Col,FormControl,Checkbox,HelpBlock
       } from 'react-bootstrap'

import axios from "axios";

const InputStyle={
    marginLeft:20
}



class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            emailError:null,
            passwordError:null,
            isLoading: false,
            info : ""
        }
    }
        
  close() {
    this.props.onClose();
     
  } 
    
     mailValidator(e)   {
        var email=e.target.value;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)) {
            this.setState ({email: email,
                            emailError:"sucess",isLoading:false,
                           info:""});
        }else {this.setState ({emailError:"error ",isLoading:true})}
    } 
    
    password(e){
        var password =  e.target.value;
        if(password.length < 6){
            this.setState({passwordError:"error",isLoading:true});
        }
        else
        this.setState({password:password,
                       passwordError:"sucess",isLoading:false,info:""});
    }
    
     handleClick() { 
    this.setState({isLoading: true});
           axios.get('http://localhost:8888/getUser', { headers: { email: this.state.email,
                                                                password:this.state.password} }).then(response => {
         
             var CURRENT_USER = response.data[0];
               this.props.onRegistered(CURRENT_USER.username);
               this.setState({isLoading: false});
          })
          .catch((error) => {
            console.log('error 3 ' + error);
               this.setState({info:"Սխալ Էլ.Հասցե կամ Գաղտնաբառ "});
          });
  }

  render() {
      let isLoading = this.state.isLoading;
    return (
        <Modal show={this.props.open} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title >Մուտք Գործել</Modal.Title> 
          </Modal.Header>
          <Modal.Body>
              <Form horizontal>
    <FormGroup  validationState = {this.state.emailError} controlId="formHorizontalEmail">
      <Col componentClass={ControlLabel} sm={2}>
        Էլ.Հասցե
      </Col>
      <Col sm={10}>
        <FormControl onBlur = {this.mailValidator.bind(this)} type="email" placeholder="Մուտքագրեք Էլ.Հասցեն" />
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword" validationState = {this.state.passwordError}>
      <Col componentClass={ControlLabel} sm={2}>
        Գաղտնաբառ
      </Col>
      <Col sm={10}>
        <FormControl type="password" onBlur = {this.password.bind(this)} placeholder="Մուտքագրեք Գաղտնաբառը"  />
      </Col>
    </FormGroup>

    <FormGroup>
      <Col smOffset={2} sm={10}>
        <Checkbox>Հիշել</Checkbox>
      </Col>
    </FormGroup>
 <HelpBlock bsStyle = "danger">{this.state.info}</HelpBlock>
    <FormGroup>
      <Col smOffset={2} sm={10}>
            <Button
                type = 'submit'
                bsStyle="primary"
                disabled={isLoading}
                onClick={!isLoading ? this.handleClick.bind(this) : null}>
        {isLoading ? 'Մուտք ...' : 'Մուտք '}
      </Button>
      </Col>
    </FormGroup>
  </Form>
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Փակել</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

export default Login;