import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import SiteNavBar from './Navbar.jsx';
import Weather from './Weather.jsx';


class App extends Component {
    
    render(){
        return(<div>
                <SiteNavBar />
                <Weather />
            </div>);
    }
    
    
    
}


export default App;
