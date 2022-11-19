import { useState } from 'react';
import axios from "axios";
import { resDishes } from "../../services/fetch.service";
import { addDish } from '../../services/data.service';
import { Container, Card, Col, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'

function UserRestaurants({restaurantName}) {
    console.log(restaurantName);
    const licenseNo = restaurantName
    const [isLoading, setLoading] = useState(true);
    const [dishes, setDishes] = useState();

    if(isLoading) {
        resDishes(setDishes, setLoading, licenseNo);
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
            
            </div>
        );
    }
}

export default UserRestaurants;