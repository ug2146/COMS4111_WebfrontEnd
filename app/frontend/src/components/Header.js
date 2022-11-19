import logo from '../nyc-logo.png';
import {logout} from "./../services/auth.service";
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'

function Header(props) {

  function logMeOut() {
    logout();
    props.token()
}
    return(
        <div>
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Link to = "/">
            <button onClick={logMeOut}> 
                Logout
            </button>
            </Link>
        </header>
    </div>
    )
}

export default Header;