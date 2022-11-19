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

const resDishes = (setData, setLoading, licenseNos) => {
  const data = [];
  //console.log("reaching")
  console.log(licenseNos)
  axios.get(API_URL + "restaurant/dishes", { params: { licenseNo: licenseNos } })
  .then((response) => {
    setData(response.data);
    setLoading(false);
  })
  return data;
};

const resOffers = (setData, setLoading, licenseNos) => {
  const data = [];
  console.log("reaching")
  console.log(licenseNos)
  axios.get(API_URL + "restaurant/offers", { params: { licenseNo: licenseNos } })
  .then((response) => {
    setData(response.data);
    setLoading(false);
  })
  return data;
};

const resRatings = (setData, setLoading, licenseNos) => {
  const data = [];
  console.log("reaching")
  console.log(licenseNos)
  axios.get(API_URL + "restaurant/ratings", { params: { licenseNo: licenseNos } })
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

const myFav = (setData, setLoading, email) => {
  const data = [];
  axios.get(API_URL + "users/favorites/" + email)
  .then((response) => {
    setData(response.data);
    setLoading(false);
  })
  return data;
}; 

const search_area = (name, setData) => {
  let areaName = name;
  if (areaName === "") {areaName = "0"}
  axios.get(API_URL + "restaurants/search/area/" + areaName)
  .then((response) => {
    setData(response.data);
  })
};

const search_res = (name, setData) => {
  let restaurantName = name;
  if (restaurantName === "") {restaurantName = "0"}
  axios.get(API_URL + "restaurants/search/res/" + restaurantName)
  .then((response) => {
    setData(response.data);
  })
};

export {
  topRes,
  topPep,
  myRev,
  staffRes,
  resDishes,
  resOffers,
  resRatings,
  search_area,
  search_res,
  myFav
};