import axios from "axios";

const API_URL = "http://localhost:8111/api/";

const topRes = (setData, setLoading) => {
  const data = [];
  axios.get(API_URL + "restaurants/top")
  .then((response) => {
    setData(response.data);
    setLoading(false);
  })
  return data;
};

const staffRes = (setData, setLoading, email) => {
  const data = [];
  console.log("reaching")
  axios.get(API_URL + "staff/restaurants/"+email)
  .then((response) => {
    setData(response.data);
    setLoading(false);
  })
  return data;
};

const topPep = (setData, setLoading) => {
  const data = [];
  axios.get(API_URL + "users/top")
  .then((response) => {
    setData(response.data);
    setLoading(false);
  })
  return data;
};

const myRev = (setData, setLoading, email) => {
  const data = [];
  axios.get(API_URL + "users/reviews/" + email)
  .then((response) => {
    setData(response.data);
    setLoading(false);
  })
  return data;
};

const search = (name, setData) => {
  let restaurantName = name;
  if (restaurantName === "") {restaurantName = "0"}
  axios.get(API_URL + "restaurants/search/" + restaurantName)
  .then((response) => {
    setData(response.data);
  })
};

export {
  topRes,
  topPep,
  search,
  myRev,
  staffRes
};