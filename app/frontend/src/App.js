import React, { useState } from 'react';
import logo from './logo.png';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { register, login, logout } from "./services/auth.service";
import useToken from './services/useToken';
import Header from './components/Header';
import Login from './components/Login';
import Register_customer from './components/Register_customer';
import Register_staff from './components/Register_staff';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'
import TopPep from './components/TopPep';
import TopRes from './components/TopRes';
import Search from './components/Search';
import MyReviews from './components/MyReviews';
import { search } from "./services/fetch.service";

function App() {
  const { token, removeToken, setToken } = useToken();
  const [email, setEmail] = useState("");
  const [restaurants, setRestaurants] = useState();
  const [tick, setTick] = useState(false);

  function handleChange(event) { 
    console.log(event.target.value);
    search(event.target.value, setRestaurants);
  }
  return (
    <div className="App">
      <Header token={removeToken} />
      {!token && token !== "" && token !== undefined ?
        <div>
          <Login setToken={setToken} setEmail = {setEmail} setTick={setTick}/>
          <Register_customer />
          <Register_staff />
        </div>
        : 
        !tick ?
        <div> Hello Customer! 
        <ul className="Features">
        <li>
          <Link to="/topRes">Find top Restaurants!</Link>
        </li>
        <li>
          <Link to="/topPep">See top Reviewers!</Link>
        </li>
        <li>
          <Link to="/myrev">My reviews</Link>
        </li>
        <li>
          <Link to="/search">Search Restaurants</Link><br />
          <input type="text" onChange={handleChange} name="searchKey"  placeholder="Search for a restaurant" />
        </li>
        </ul>
        <Routes>
        <Route exact path='/topRes' element={< TopRes />}></Route>
        <Route exact path='/topPep' element={< TopPep />}></Route>
        <Route exact path='/search' element={< Search restaurants={restaurants} email={email} />}></Route>
        <Route exact path='/myrev' element={< MyReviews email={email}/>}></Route>
      </Routes>
        </div>
        :
        <div>Hello Staff!

        </div>
    }
    </div>
  );
}

export default App;
