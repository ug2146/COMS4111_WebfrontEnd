import { useState } from 'react';
import axios from "axios";
import {register_staff, login, logout} from "../services/auth.service";

function Register_staff(props) {

    const [registerForm, setregisterForm] = useState({
      email: "",
      password: "",
      staffid: "",
      name: "",
    })

    function registerMe(event) {
      register_staff(registerForm.email, registerForm.password, registerForm.staffid, registerForm.name);
      setregisterForm(({
        email: "",
        password: "",
        staffid: "",
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
        <h2>Register as a Staff</h2>
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
                  text={registerForm.staffid} 
                  name="staffid"
                  placeholder="Staff ID"
                  value={registerForm.staffid} />
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

export default Register_staff;