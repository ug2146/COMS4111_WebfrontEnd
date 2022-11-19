import { useState } from 'react';
import axios from "axios";
import { staffRes } from "../../services/fetch.service";
import { addRestaurant } from '../../services/data.service';
import { Container, Card, Col, Button } from 'react-bootstrap';
import StaffRestaurant from './StaffRestaurant';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'

function AddOffers({email}) {
    const [isLoading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState();
    const [curRestaurant, setCurRestaurant] = useState("");
    const [licenseNo, setLicenseNo] = useState("");
    const [restaurant_name, setRestaurant_name] = useState("");
    const [customer_service_no, setCustomer_service_no] = useState("");
    const [street_address, setStreet_address] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [message, setMessage] = useState("");
    const handleClick = (event) => {
        console.log("set res to", event.target.value)
        setCurRestaurant(event.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        //refactor this
        try {
          let res = await addRestaurant(licenseNo, restaurant_name, customer_service_no, street_address,zipcode, email)
          let resJson = await res.json();
          if (res.status === 200) {
            setLicenseNo("");
            setRestaurant_name("");
            setStreet_address("");
            setZipcode("");
            setMessage("User created successfully");
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
      };
    if(isLoading) {
        staffRes(setRestaurants, setLoading, email);
        return <div>Loading...</div>
    }
    else
    {
        return (
            <div className = "rlist">
                { restaurants.length===0 ?
                <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Title>Describe the Offer</Card.Title>
                    <Card.Text>
                    <form onSubmit={handleSubmit}>
                        <input
                        type="text"
                        value={licenseNo}
                        placeholder="License No"
                        onChange={(e) => setLicenseNo(e.target.value)}
                        />
                        <input
                        type="text"
                        value={restaurant_name}
                        placeholder="Restaurant Name"
                        onChange={(e) => setRestaurant_name(e.target.value)}
                        />
                        <input
                        type="text"
                        value={customer_service_no}
                        placeholder="Customer service no"
                        onChange={(e) => setCustomer_service_no(e.target.value)}
                        />
                        <input
                        type="text"
                        value={street_address}
                        placeholder="Stree Address"
                        onChange={(e) => setStreet_address(e.target.value)}
                        />
                        <input
                        type="text"
                        value={zipcode}
                        placeholder="Zipcode"
                        onChange={(e) => setZipcode(e.target.value)}
                        />
                        <button type="submit">Add this Offer</button>
                    </form>
                    <div className="message">{message ? <p>{message}</p> : null}</div>
                    </Card.Text>
                </Card>
                </div>
                :
                <div>
                {restaurants.map((restaurant) => (
                    <div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Title>{restaurant.restaurantName}</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            <Link to="/staffres">
                            <Button value = {restaurant.restaurantName} onClick= {handleClick}> 
                                View Restaurant Details
                            </Button>
                            </Link>

                        </Card>
                    </div>
                ))}
                <Routes>
                    <Route exact path='/staffres' element={< StaffRestaurant restaurant={curRestaurant}/>}></Route>
                </Routes>
                </div>
            }
            </div>
        );
    }
}

export default AddOffers;