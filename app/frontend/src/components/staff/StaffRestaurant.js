import { useState } from 'react';
import axios from "axios";
import { resDishes } from "../../services/fetch.service";
import { addDish } from '../../services/data.service';
import { Container, Card, Col, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'
function StaffRestaurant({restaurantName}) {
    console.log(restaurantName);
    const licenseNo = restaurantName
    const [isLoading, setLoading] = useState(true);
    const [dishes, setDishes] = useState();
    const [dish_name, setDish_name] = useState("");
    const [dish_category, setDish_category] = useState("");
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
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
    if(isLoading) {
        resDishes(setDishes, setLoading, licenseNo);
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
                    <form onSubmit={handleSubmit}>
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
                        </Card>
                    </div>
                ))}
                </div>
            
            </div>
        );
    }
}

export default StaffRestaurant;