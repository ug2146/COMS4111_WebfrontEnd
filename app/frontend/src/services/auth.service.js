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

const login = (email, password, tick) => {
  return axios
    .post(API_URL + "login", {
      email : email,
      password: password,
      tick : tick,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
      }
      return response.data;
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