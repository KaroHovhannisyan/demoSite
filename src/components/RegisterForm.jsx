import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import {Button,
        Navbar,Nav,NavItem,NavDropdown,MenuItem,
        Modal,
        ButtonGroup,
        
       } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
const InputStyle={
    marginLeft:20
}
import axios from "axios";


class RegisterForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordMatch:"",
            gender:"",
            username:"",
            phoneNumber:"",
            usernameError:"",
            loading: false,
            finished: false,
            stepIndex: 0,
            nextStep: false,
            emailError: "",
            passwordError :"",
            passwordMatchError:"",
        
            
        }
    }
    

    
  dummyAsync(cb) {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  }
    
  close() {
   this.props.onClose();
     
  }
    
    register(){
        
      var  self = this;
        this.setState({stepIndex:0,
                       loading:false});
        axios.post('http://localhost:8888/addUser', {
    email: this.state.email,
    password: this.state.password,
    username:this.state.username,
    gender:this.state.gender,
    phoneNumber:this.state.phoneNumber
  })
  .then(function (response) {
    console.log(response);
    self.props.onRegiter(self.state.username);
  })
  .catch(function (error) {
    console.log(error);
  });
    }
    
     select (gender) {
    this.setState({gender:gender})};

  handleNext(){
      const {stepIndex,emailError,passwordError,passwordMatchError} = this.state;
    if (!this.state.loading && !emailError && !passwordError && !passwordMatchError) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
        nextStep:false
      }));
    }
  }
  

  handlePrev(){
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
        nextStep:true
      }));
    }
  }
    
   confirm(e){
    const {password} = this.state;
        var confirm = e.target.value;
        if(confirm ===  this.state.password){
            this.setState({passwordMatchError:"",
                           nextStep:true
                           });
        }
        else
            this.setState({passwordMatchError:"Գաղտնաբառերը չեն համընկնում"});

    }
    
   
     mailValidator(e)   {
        var email=e.target.value;
         console.log(email);
        this.setState({email:email})
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)) {   
            axios.get('http://localhost:8888/cheking', { headers: { email:email} }).then(res => { 
         console.log(res.data);
          if(!res.data){
              
               this.setState ({emailError:"Էլ.Հասցեն արդեն գրանցված է "})
              
          }else{
              this.setState ({emailError:"",
                              enail:email})
              
          }
            
          })
          .catch((error) => {
           { console.log('error 3 ' + error);}
              
          });  
          }
            
        else {this.setState ({emailError:"Սխալ Էլ.Հասցե "})}
         
        
         
    } 
    password(e){
        var password =  e.target.value;
        if(password.length < 6){
            this.setState({passwordError:"Գաղտնաբառը պետք է պարունակի առվազն 6 նիշ"});
        }
        else{
            if(this.state.passwordMatch===password){this.setState({passwordMatchError:""})}
        this.setState({password:password,
                       passwordError:""});
    }
    }
    
    setPhone(p){
        var phone = p.target.value;
        if(!isNaN(phone) && phone.length <=11){
            this.setState({phoneNumber:phone});
        }
        if(phone.length === 11){
            37494696384
            var changed = "+("+phone.substr(0,3)+")-("+phone.substr(3,2)+") "+phone.substr(5,3)+"-"+phone.substr(8,3);
            this.setState({phoneNumber:changed,
                            nextStep:true});
        }
            
            
                
        }
        
    
    setUsername(u){
        var username = u.target.value;
        var self = this;
        axios.get('http://localhost:8888/chekingUsername', { headers: { username:username} }).then(res => {
            
         console.log(res.data);
          if(!res.data){
               self.setState ({usernameError:"Մուտքանունը արդեն գրանցված է "})
          }else{
              self.setState ({usernameError:"",
                              username:username,
                              nextStep:true
                              });
              
              
          }
            
          })
          .catch((error) => {
           { console.log('error 3 ' + error);}
              
          });
        
        
        
    }
    

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
              <div>
                <Subheader>Էլ.Հասցե </Subheader>
                   <TextField
                       value={this.state.email}
                        errorText={this.state.emailError}
                        errorStyle ={{fontSize:9}}
                        id="Email"
                        style={InputStyle}
                        onBlur={this.mailValidator.bind(this)}
                        onChange = {(e)=>{this.setState(email:e.target.value)}}
                        
                         />
                <br/>
                <Subheader>Գաղտնաբառ </Subheader>
                    <TextField
                        errorText ={this.state.passwordError}
                        errorStyle ={{fontSize:9}}
                        type ="password"
                        onBlur ={this.password.bind(this)}
                        onChange = {(e)=>{this.setState(password:e.target.value)}}
                        style={InputStyle}
                        value = {this.state.password}
                    />
                <br />
                <Subheader>Կրկնեք Գաղտնաբառը</Subheader>
                
                <TextField
                         errorText={this.state.passwordMatchError}
                         errorStyle ={{fontSize:9}}
                         type="password"
                         onBlur={this.confirm.bind(this)}
                         style={InputStyle}
                         value = {this.state.passwordMatch}
                         onChange = {(e)=>{this.setState({passwordMatch:e.target.value})}}

                    />
                
                </div>
        );
      case 1:
        return (
            <div>
                    <Subheader>Մուտքանուն</Subheader>
                         <TextField
                              errorText={this.state.usernameError}
                              errorStyle ={{fontSize:9}}
                              id="Username"
                              style={InputStyle}
                              onBlur={this.setUsername.bind(this)}
                              onChange = {(e)=>{this.setState(username:e.target.value)}}
                              value = {this.state.username}
                         />
                         
                    <Subheader>Սեռ</Subheader>
                         <ButtonGroup>
                             <Button   onClick={this.select.bind(this,"MALE")}  id="btn-gender" >Արական</Button>
                             <Button   onClick={this.select.bind(this,"FEMALE")}id="btn-gender">Իգական</Button>
                         </ButtonGroup>
            </div>);
     
      case 2:
        return (
            <div>
            <Subheader>Հեռախոսահամար</Subheader>
                   <TextField
                        id="Phone"
                        style={InputStyle}
                        onChange={this.setPhone.bind(this)}
                        value = {this.state.phoneNumber}
                        placeholder = "+(374)-(xx) xxx-xxx"
                        
                        
                        
                       
                         />
          </div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (finished) {
      return (
        <div style={contentStyle}>
              
              <Button   onClick={this.register.bind(this)}  id="register" >Verjacnel grancum@ </Button>
    
        </div>
      );
    }

    return (
 
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Հետ"
            disabled={stepIndex === 0}
            onClick={this.handlePrev.bind(this)}
            style={{marginRight: 12}}
          />
          <RaisedButton
            disabled = {!this.state.nextStep}
            label={stepIndex === 2 ? 'Ավարտել' : 'Հաջորդը'}
            primary={true}
            onClick={stepIndex === 2 ?this.register.bind(this):this.handleNext.bind(this)}
          />
        </div>
      </div>
    );
  }

  render() {
    const {loading, stepIndex} = this.state;

    return (
        
        <Modal show={this.props.open} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title >Գրանցում</Modal.Title> 
          </Modal.Header>
          <Modal.Body>
              
               <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Էլ.Հասցե և Գաղտնաբառ </StepLabel>
          </Step>
          <Step>
            <StepLabel>Ծննդյան տարեթիվ և Սեռ</StepLabel>
          </Step>
          <Step>
            <StepLabel>Հեռախոս</StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </div>
        </MuiThemeProvider>
              
              
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Փակել</Button>
          </Modal.Footer>
        </Modal>
        
        
        
        
        
    );
  }
}

export default RegisterForm;