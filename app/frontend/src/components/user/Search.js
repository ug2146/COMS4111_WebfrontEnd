import { useState, useEffect } from 'react';
import { addReview } from '../../services/data.service';
import {Card, Button} from 'react-bootstrap';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'
import UserRestaurants from './UserRestaurants';

function Search({ restaurants, email }) {
    const [restaurantsList, setRestaurantsList] = useState([]);
    const [review, setReview] = useState('');
    const [curRestaurant, setCurRestaurant] = useState("");
    const handleClick = (event) => {
        console.log("hitting")
        console.log(restaurants)
        setCurRestaurant(event.target.value);
    };
    const handleChange = (event) => {
        setReview(event.target.value);
    };

    useEffect(() => {
        setRestaurantsList(restaurants);
    }, [restaurants]);
        
    const addRev = (event) => {
        addReview(email, review, event.target.name);
    };

    return (
        <div className = "rlist">
            {restaurantsList && (restaurantsList.map((restaurant) => (
                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Title>{restaurant.restaurantName}</Card.Title>
                        <Card.Text>
                            Average Rating: {restaurant.avg_rating}
                        </Card.Text>
                        <Link to = "restaurantPage">
                            <Button value ={restaurant.license_no} onClick = {handleClick}>
                                Go to restaurant
                            </Button>
                        </Link>
                        <Button variant="primary" onClick={addRev} name={restaurant.restaurantName}>Add Review
                            <input
                                type="text"
                                onChange={handleChange}
                                name="writtenReview"
                                placeholder="Add your review"
                            />
                        </Button>
                    </Card>
                </div>
            )))}
            <Routes>
                <Route exact path = "restaurantPage" element = {< UserRestaurants restaurantName={curRestaurant}/>}></Route>
             </Routes>
        </div>
    );
}

export default Search;