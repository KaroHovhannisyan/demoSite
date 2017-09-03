import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Button,
        Navbar,Nav,NavItem,NavDropdown,MenuItem,
        Modal,
       } from 'react-bootstrap';
import '../main.css';
import UserPage from './UserPage.jsx';


class SiteNavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
        }
    }
    
    
    
 close() {
    this.setState({ showModal: false });
     
  }

  open() {
       console.log("Opening Modale");
    this.setState({ showModal: true });
  }
    
    render(){
        return(
            <div>
  <Navbar default collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
          <img  id = 'logo' src="./src/img/logo_react.png"/>
    
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#">Գլխավոր</NavItem>
             <NavDropdown eventKey={2} title="Հայտարարություններ" id="basic-nav-dropdown">
          <MenuItem eventKey={2.1}>Աշխատանք</MenuItem>
          <MenuItem eventKey={2.2}>Առք/Վաճառք/Վարձակալություն</MenuItem>
          <MenuItem eventKey={2.3}>Ծառայություններ </MenuItem>
        
        </NavDropdown>
        <NavDropdown eventKey={3} title="Լուրեր" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Աշխարհ</MenuItem>
          <MenuItem eventKey={3.2}>Բիզնես</MenuItem>
          <MenuItem eventKey={3.3}>Մշակույթ</MenuItem>
          <MenuItem eventKey={3.4}>Սպորտ</MenuItem>
        </NavDropdown>
          <NavDropdown eventKey={4} title="Ժամանցային" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Աշխարհ</MenuItem>
          <MenuItem eventKey={3.2}>Բիզնես</MenuItem>
          <MenuItem eventKey={3.3}>Մշակույթ</MenuItem>
          <MenuItem eventKey={3.4}>Սպորտ</MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
          <UserPage / >  
      </Nav>
    </Navbar.Collapse>
                </Navbar> 
        </div>
        
        );
    }
    
    
    
}


export default SiteNavBar;
