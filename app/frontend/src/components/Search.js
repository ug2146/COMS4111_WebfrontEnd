import { useState, useEffect } from 'react';
import { addReview } from '../services/data.service';
import {Card, Button} from 'react-bootstrap';

function Search({ restaurants, email }) {
    const curRestaurant = "Hi";
    const [restaurantsList, setRestaurantsList] = useState([]);
    const [review, setReview] = useState('');

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
                        <Button variant="primary">Go to the Restaurant Page</Button>
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
        </div>
    );
}

export default Search;