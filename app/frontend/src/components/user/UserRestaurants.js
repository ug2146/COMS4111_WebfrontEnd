import { useState } from 'react';
import axios from "axios";
import { resDishes } from "../../services/fetch.service";
import { resOffers } from "../../services/fetch.service";
import { resRatings } from "../../services/fetch.service";
import { resdetails } from "../../services/fetch.service";
import { addDish } from '../../services/data.service';
import { Container, Card, Col, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'

function UserRestaurants({restaurantName}) {
    console.log(restaurantName);
    const licenseNo = restaurantName
    const [isLoading1, setLoading1] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [isLoading3, setLoading3] = useState(true);
    const [isLoading4, setLoading4] = useState(true);
    const [dishes, setDishes] = useState([]);
    const [offers, setOffers] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [rest, setres] = useState([]);

    if(isLoading1) {
        resdetails(setres, setLoading1, licenseNo);
        return <div>Loading...</div>
    }
    else if(isLoading2)
    {
        resDishes(setDishes, setLoading2, licenseNo);
        return <div>Loading2..</div>
    }
    else if(isLoading3)
    {
        resOffers(setOffers, setLoading3, licenseNo);
        return <div>Loading3..</div>
    }
    else if(isLoading4)
    {
        resRatings(setRatings, setLoading4,licenseNo);
        return <div> Loading4</div>
    }
    else
    {
        console.log('resdetais', rest)
        console.log('resDishes', dishes)
        console.log('offers', offers)
        console.log('ratings', ratings)
        return (
            <div className = "dList">
                <div>
                {rest.map((res) => (
                    <div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Title>{res.restaurant_name}</Card.Title>
                            <Card.Text>
                                Customer Service Number: {res.customer_service_no} <br/>
                                Street Address: {res.street_address}  <br/>
                                Zipcode : {res.zipcode} <br/>
                                Area: {res.area}
                            </Card.Text>
                        </Card>
                    </div>
                ))}
                </div>
                <div>
                <Card style={{ width: '18rem' }}>
                <Card.Title> Dishes </Card.Title>
                </Card>
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
                <Card style={{ width: '18rem' }}>
                <Card.Title> Offers </Card.Title>
                </Card>
                {offers.map((offer) => (
                    <div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Title>{offer.percentage_discount}</Card.Title>
                            <Card.Text>
                                Valid Till: {offer.valid_till} <br/>
                                Offer Description: {offer.offer_description}
                            </Card.Text>
                        </Card>
                    </div>
                ))}
                </div>
                <div>
                <Card style={{ width: '18rem' }}>
                <Card.Title> Reviews </Card.Title>
                </Card>
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