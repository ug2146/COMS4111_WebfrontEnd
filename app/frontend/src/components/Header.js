import logo from '../logo.png';
import {logout} from "./../services/auth.service";

function Header(props) {

  function logMeOut() {
    logout();
    props.token()
}
    return(
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <button onClick={logMeOut}> 
                Logout
            </button>
        </header>
    )
}

export default Header;