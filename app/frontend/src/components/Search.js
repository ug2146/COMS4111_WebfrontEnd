import { useState, useEffect } from 'react';
import { addReview } from '../services/data.service';
import {Card, Button} from 'react-bootstrap';

function Search({ restaurants, email }) {
    const curRestaurant = "Hi";
    const [restaurantsList, setRestaurantsList] = useState([]);

    const [ambience, setAmbience] = useState("");
    const [crowd, setCrowd] = useState("");
    const [customer_service, setCustomerService] = useState("");
    const [value_for_money, setValueForMoney] = useState("");
    const [taste, setTaste] = useState("");
    const [cooked, setCooked] = useState("");
    const [writtenReview, setWrittenReview] = useState("");

    const [favorite, setFavorite] = useState("");

    const handleChange_ambience = (event) => {
        console.log('value', event.target.value);
        setAmbience(event.target.value);
    };

    const handleChange_crowd = (event) => {
        console.log('value', event.target.value);
        setCrowd(event.target.value);
    };

    const handleChange_customer_service = (event) => {
        console.log('value', event.target.value);
        setCustomerService(event.target.value);
    };

    const handleChange_value_for_money = (event) => {
        console.log('value', event.target.value);
        setValueForMoney(event.target.value);
    };

    const handleChange_taste = (event) => {
        console.log('value', event.target.value);
        setTaste(event.target.value);
    };

    const handleChange_cooked = (event) => {
        console.log('value', event.target.value);
        setCooked(event.target.value);
    };

    const handleChange_writtenReview = (event) => {
        console.log('value', event.target.value);
        setWrittenReview(event.target.value);
    };

    const handleChange_favorite = (event) => {
        console.log('value', event.target.value);
        setFavorite(event.target.value);
    };

    useEffect(() => {
        setRestaurantsList(restaurants);
    }, [restaurants]);
        
    const addRev = (event) => {
        addReview(email, ambience, crowd, customer_service, value_for_money, taste, cooked, writtenReview, event.target.name);
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
                        <Button variant="primary" onClick={addRev} name={restaurant.licenseNo}>Add Review
                            <input type="text" onChange={handleChange_ambience} name="ambience"  placeholder="Ambience 0-5" />
                            <input type="text" onChange={handleChange_crowd} name="crowd"  placeholder="Crowd 0-5" />
                            <input type="text" onChange={handleChange_customer_service} name="customer_service"  placeholder="Customer service 0-5" />
                            <input type="text" onChange={handleChange_value_for_money} name="value_for_money"  placeholder="Value for money 0-5" />
                            <input type="text" onChange={handleChange_taste} name="taste"  placeholder="Taste 0-5" />
                            <input type="text" onChange={handleChange_cooked} name="cooked"  placeholder="Cooked 0-5" />
                            <input type="text" onChange={handleChange_writtenReview} name="writtenReview"  placeholder="Written review" />
                        </Button>
                        <Button variant="primary" onClick={addRev} name={restaurant.licenseNo}>Favorite this Restaurant?
                            <input type="text" onChange={handleChange_favorite} name="favorite"  placeholder="Y/N" />
                        </Button>
                    </Card>
                </div>
            )))}
        </div>
    );
}

export default Search;