import { useState } from 'react';
import axios from "axios";
import { resDishes } from "../../services/fetch.service";
import { resOffers } from "../../services/fetch.service";
import { resRatings } from "../../services/fetch.service";
import { addDish } from '../../services/data.service';
import { Container, Card, Col, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'

function UserRestaurants({restaurantName}) {
    console.log(restaurantName);
    const licenseNo = restaurantName
    const [isLoading, setLoading] = useState(true);
    const [dishes, setDishes] = useState();
    const [offers, setOffers] = useState();
    const [ratings, setRatings] = useState();

    if(isLoading) {
        resDishes(setDishes, setLoading, licenseNo);
        resOffers(setOffers, setLoading, licenseNo);
        resRatings(setRatings, setLoading,licenseNo);
        return <div>Loading...</div>
    }
    else
    {
        return (
            <div className = "dList">
                <div>
                {dishes.map((dish) => (
                    <div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Title>{dish.dish_name}</Card.Title>
                            <Card.Text>
                                Dish Category: {dish.dish_category} <br/>
                                Dish Price: {dish.price} 
                            </Card.Text>
                        </Card>
                    </div>
                ))}
                </div>
                <div>
                {offers.map((offer) => (
                    <div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Title>{offer.percentage_discount}</Card.Title>
                            <Card.Text>
                                Offer Description: {dish.offer_description} <br/>
                            </Card.Text>
                        </Card>
                    </div>
                ))}
                </div>
                <div>
                {ratings.map((rating) => (
                    <div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Title>{rating.username}</Card.Title>
                            <Card.Text>
                            Ambience: {rating.ambience} <br/>
                            Crowd: {rating.crowd} <br/>
                            Customer Service: {rating.customer_service} <br/>
                            Value for Money: {rating.value_for_money} <br/>
                            Taste: {rating.taste} <br/>
                            Cooked: {rating.cooked} <br/>
                            Overall Written Review: {rating.overall_written_review}
                            </Card.Text>
                        </Card>
                    </div>
                ))}
                </div>
            </div>
           
        );
    }
}

export default UserRestaurants;