import axios from "axios";
import useToken from "./useToken";

const API_URL = "http://localhost:8111/api/auth/";

const register_customer = (email, password, phoneno, name) => {
  return axios.post(API_URL + "signup/customer", {
    email,
    password,
    phoneno,
    name,
  });
};

const register_staff = (email, password, staffid, name) => {
  return axios.post(API_URL + "signup/staff", {
    email,
    password,
    staffid,
    name,
  });
};

const login = (email, password, tick, setToken) => {
  return axios
    .post(API_URL + "login", {
      email : email,
      password: password,
      tick : tick,
    })
    .then((response) => {
      console.log(response)
      if (response.data.access_token!== "") {
        console.log(response.data.access_token);
        console.log(response.status)
        setToken(response.data.access_token);
      }
      else
      {
        console.log("coming here");
        setToken("");
      }
      return response.data.access_token;
    });
};

const logout = () => {
    localStorage.removeItem("token");
};

export {
  register_customer,
  register_staff,
  login,
  logout
};