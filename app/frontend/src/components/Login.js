import { useState } from 'react';
import axios from "axios";
import {register, login, logout} from "../services/auth.service";

function Login({setToken, setEmail, setTick}) {

    const [loginForm, setloginForm] = useState({
      email: "",
      password: "",
      tick: false
    })

    function logMeIn(event) {
      const token = login(loginForm.email, loginForm.password, loginForm.tick, setToken);
      console.log("Token is: " + token);
      setloginForm(({
        email: "",
        password: "",
        tick: false}))
        setEmail(loginForm.email);
      event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}
    
    function handleChange_tick(event) { 
      const {value, name} = event.target
      setTick(!loginForm.tick);
      setloginForm(prevNote => ({
          ...prevNote, tick: !loginForm.tick})
      )}

    return (
      <div>
        <h1>Login</h1>
          <form className="login">
            <input onChange={handleChange} 
                  type="email"
                  text={loginForm.email} 
                  name="email" 
                  placeholder="Email" 
                  value={loginForm.email} />
            <input onChange={handleChange} 
                  type="password"
                  text={loginForm.password} 
                  name="password" 
                  placeholder="Password" 
                  value={loginForm.password} />  
            <label>
              <input onChange={handleChange_tick} 
                    type="checkbox"  
                    name="tick"  
                    value={loginForm.tick} />
                    Are you a staff?
            </label>
                  

          <button onClick={logMeIn}>Submit</button>
        </form>
      </div>
    );
}

export default Login;