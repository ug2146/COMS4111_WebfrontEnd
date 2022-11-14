import { useState } from 'react';
import axios from "axios";
import {register_customer, login, logout} from "../services/auth.service";

function Register_customer(props) {

    const [registerForm, setregisterForm] = useState({
      email: "",
      password: "",
      phoneno: "",
      name: "",
    })

    function registerMe(event) {
      register_customer(registerForm.email, registerForm.password, registerForm.phoneno, registerForm.name);
      setregisterForm(({
        email: "",
        password: "",
        phoneno: "",
        name: ""}))

      event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setregisterForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div>
        <h2>Register as a Customer</h2>
          <form className="register">
            <input onChange={handleChange} 
                  type="email"
                  text={registerForm.email} 
                  name="email" 
                  placeholder="Email" 
                  value={registerForm.email} />
            <input onChange={handleChange} 
                  type="password"
                  text={registerForm.password} 
                  name="password" 
                  placeholder="Password" 
                  value={registerForm.password} />
            <input onChange={handleChange} 
                  type="text"
                  text={registerForm.phoneno} 
                  name="phoneno"
                  placeholder="Phone Number"
                  value={registerForm.phoneno} />
            <input onChange={handleChange}
                    type="text"
                    text={registerForm.name}
                    name="name"
                    placeholder="Name"
                    value={registerForm.name} />

          <button onClick={registerMe}>Submit</button>
        </form>
      </div>
    );
}

export default Register_customer;