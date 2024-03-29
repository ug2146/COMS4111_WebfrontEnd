import { useState, useEffect } from 'react';
import { addReview, addFavorite } from '../../services/data.service';
import {Card, Button} from 'react-bootstrap';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'
import UserRestaurants from './UserRestaurants';

function Search({ restaurants, email }) {
    const [restaurantsList, setRestaurantsList] = useState([]);

    const [ambience, setAmbience] = useState("");
    const [crowd, setCrowd] = useState("");
    const [customer_service, setCustomerService] = useState("");
    const [value_for_money, setValueForMoney] = useState("");
    const [taste, setTaste] = useState("");
    const [cooked, setCooked] = useState("");
    const [writtenReview, setWrittenReview] = useState("");
    const [curRestaurant, setCurRestaurant] = useState("");
    const [addfavorite, setaddFavorite] = useState("");
    const [isClicked, setIsClicked] = useState(false);

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

    const handleChange_addfavorite = (event) => {
        console.log('value', event.target.value);
        setaddFavorite(event.target.value);
    };
    const handleClick = (e) => {
        setIsClicked(true)
        setCurRestaurant(e.target.value)
    };

    useEffect(() => {
        setRestaurantsList(restaurants);
    }, [restaurants]);
        
    const addRev = (event) => {
        addReview(email, ambience, crowd, customer_service, value_for_money, taste, cooked, writtenReview, event.target.name);
    };

    const addFav = (event) => {
        addFavorite(email, event.target.name, addfavorite);
    };

    return (
        <div className = "rlist">
            { isClicked === true ? <div>{curRestaurant}</div> :
            restaurantsList && (restaurantsList.map((restaurant) => (
                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Title>{restaurant.restaurantName}</Card.Title>
                        <Card.Text>
                            Average Rating: {restaurant.avg_rating}
                        </Card.Text>
                        <Link to = "restaurantPage">
                            <Button value ={restaurant.licenseNo} onClick = {handleClick}>
                                Go to restaurant
                            </Button>
                        </Link>
                        <Button variant="primary" onClick={addRev} name={restaurant.licenseNo}>Add Review
                            <input type="text" onChange={handleChange_ambience} name="ambience"  placeholder="Ambience 0-5" />
                            <input type="text" onChange={handleChange_crowd} name="crowd"  placeholder="Crowd 0-5" />
                            <input type="text" onChange={handleChange_customer_service} name="customer_service"  placeholder="Customer service 0-5" />
                            <input type="text" onChange={handleChange_value_for_money} name="value_for_money"  placeholder="Value for money 0-5" />
                            <input type="text" onChange={handleChange_taste} name="taste"  placeholder="Taste 0-5" />
                            <input type="text" onChange={handleChange_cooked} name="cooked"  placeholder="Cooked 0-5" />
                            <input type="text" onChange={handleChange_writtenReview} name="writtenReview"  placeholder="Written review" />
                        </Button>
                        <Button variant="primary" onClick={addFav} name={restaurant.licenseNo}>Favorite this Restaurant?
                            <input type="text" onChange={handleChange_addfavorite} name="addfavorite"  placeholder="Y/y" />
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