import { useState } from 'react';
import axios from "axios";
import {topRes} from "../../services/fetch.service";
import {Container ,Card, Col, Button} from 'react-bootstrap';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'
import UserRestaurants from "./UserRestaurants";

function TopRes() {
    const [isLoading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState();
    const [curRestaurant, setCurRestaurant] = useState("");
    const [isClicked, setIsClicked] = useState(false)
    const handleClick = (event) => {
        console.log("hitting")
        console.log(restaurants);
        setIsClicked(true);
        setCurRestaurant(event.target.value);
    };
    if(isLoading) {
        topRes(setRestaurants, setLoading);
        return <div>Loading...</div>
    }
    else
    {
        return (
            <div className = "rlist">
                    {restaurants.map((restaurant) => (
                        <div>
                            <Card style={{ width: '18rem' }}>
                                <Card.Title>{restaurant.restaurantName}</Card.Title>
                                <Card.Text>
                                    {/*{restaurant.restaurantName}
                                    <br>
                                    </br>*/}
                                    Average rating: {restaurant.avg_rating}
                                </Card.Text>
                                <Link to = "restaurantPage">
                                <Button value ={restaurant.license_no} onClick = {handleClick}>
                                    Go to restaurant
                                </Button>
                                </Link>
                            </Card>
                        </div>
                    ))}
                    <Routes>
                        <Route exact path = "restaurantPage" element = {< UserRestaurants restaurantName={curRestaurant}/>}></Route>
                    </Routes>
            </div>
        );
    }
}

export default TopRes;