import { useState } from 'react';
import axios from "axios";
import { resDishes, resOffers } from "../../services/fetch.service";
import { addDish, delDish, addOffer, delOffer } from '../../services/data.service';
import { Container, Card, Col, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'
function StaffRestaurant({restaurantName}) {
    console.log(restaurantName);
    const licenseNo = restaurantName
    const [isLoading, setLoading] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [dishes, setDishes] = useState();
    const [dish_name, setDish_name] = useState("");
    const [dish_category, setDish_category] = useState("");
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");
    
    const [percentage_discount, setPercentageDiscount] = useState("");
    const [offer_description, setOfferDescription] = useState("");
    const [valid_till, setValidTill] = useState("");
    const [offers, setOffers] = useState();
    
    const handleDel_dish = async (e) => {
        e.preventDefault();
        await delDish(e.target.value);
    };

    const handleDel_offer = async (e) => {
        e.preventDefault();
        await delOffer(e.target.value);
    };

    const handleSubmit_dish = async (e) => {
        e.preventDefault();
        try {
          let res = await addDish(dish_name, dish_category, price, licenseNo)
          let resJson = await res.json();
          if (res.status === 200) {
            setDish_name("");
            setDish_category("");
            setPrice("");
            setMessage("Dish added successfully");
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
      };
    
    const handleSubmit_offer = async (e) => {
    e.preventDefault();
    try {
        let res = await addOffer(licenseNo, percentage_discount, offer_description, valid_till)
        let resJson = await res.json();
        if (res.status === 200) {
        setPercentageDiscount("");
        setOfferDescription("");
        setValidTill("");
        setMessage("Offer added successfully");
        } else {
        setMessage("Some error occured");
        }
    } catch (err) {
        console.log(err);
    }
    };
    
    if(isLoading || isLoading2) {
        resDishes(setDishes, setLoading, licenseNo);
        resOffers(setOffers, setLoading2, licenseNo);
        return <div>Loading...</div>
    }
    else
    {
        return (
            <div className = "dList">
                <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Title>Add Dish</Card.Title>
                    <Card.Text>
                    <form onSubmit={handleSubmit_dish}>
                        <input
                        type="text"
                        value={dish_name}
                        placeholder="Dish name"
                        onChange={(e) => setDish_name(e.target.value)}
                        />
                        <input
                        type="text"
                        value={dish_category}
                        placeholder="Dish Category"
                        onChange={(e) => setDish_category(e.target.value)}
                        />
                        <input
                        type="text"
                        value={price}
                        placeholder="Dish price"
                        onChange={(e) => setPrice(e.target.value)}
                        />
                        <button type="submit">Add Dish</button>
                    </form>
                    <div className="message">{message ? <p>{message}</p> : null}</div>
                    </Card.Text>
                </Card>
                </div>
                <div>
                {dishes.map((dish) => (
                    <div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Title>{dish.dish_name}</Card.Title>
                            <Card.Text>
                                Dish Category: {dish.dish_category} <br/>
                                Dish Price: {dish.price} 
                            </Card.Text>
                            <Button value = {dish.dish_id} onClick= {handleDel_dish}>
                                Delete Dish
                            </Button>
                        </Card>
                    </div>
                ))}
                </div>
                <div>
                <Card style={{ width: '18rem' }}>
                <Card.Title>Add Offer</Card.Title>
                    <Card.Text>
                    <form onSubmit={handleSubmit_offer}>
                        <input
                        type="text"
                        value={percentage_discount}
                        placeholder="Percentage Discount"
                        onChange={(e) => setPercentageDiscount(e.target.value)}
                        />
                        <input
                        type="text"
                        value={offer_description}
                        placeholder="Offer Description"
                        onChange={(e) => setOfferDescription(e.target.value)}
                        />
                        <input
                        type="text"
                        value={valid_till}
                        placeholder="Valid till (YYYY-MM-DD)"
                        onChange={(e) => setValidTill(e.target.value)}
                        />
                        <button type="submit">Add Offer</button>
                    </form>
                    <div className="message">{message ? <p>{message}</p> : null}</div>
                    </Card.Text>
                </Card>
                </div>
                <div>
                    <Card style={{ width: '18rem' }}>
                    <Card.Title> All Offers</Card.Title>
                    </Card>
                {offers.map((offer) => (
                    <div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Text>
                                Percentage Discount: {offer.percentageDiscount} <br/>
                                Offer Description: {offer.offerDescription} <br/>
                                Valid Till: {offer.validTill} 
                            </Card.Text>
                            <Button value = {offer.offerId} onClick= {handleDel_offer}>
                                Delete Offer
                            </Button>
                        </Card>
                    </div>
                ))}
                </div>
            
            </div>
        );
    }
}

export default StaffRestaurant;