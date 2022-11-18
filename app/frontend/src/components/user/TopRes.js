import { useState } from 'react';
import axios from "axios";
import {topRes} from "../../services/fetch.service";
import {Container ,Card, Col, Button} from 'react-bootstrap';
function TopRes() {
    const [isLoading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState();
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
                                <Button variant="primary">Go to the Restaurant Page</Button>
                            </Card>
                        </div>
                    ))}
                
            </div>
        );
    }
}

export default TopRes;