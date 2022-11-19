import { useState } from 'react';
import axios from "axios";
import { myFav } from "../../services/fetch.service";
import { Container, Card, Col, Button } from 'react-bootstrap';
import { delFavorite } from "../../services/data.service";

function MyFavorites({email}) {
    const [isLoading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    
    const [remfavorite, setremFavorite] = useState("");

    const handleChange_remfavorite = (event) => {
        console.log('value', event.target.value);
        setremFavorite(event.target.value);
    };

    const delFav = (event) => {
        delFavorite(email, event.target.name, remfavorite);
    };

    if (isLoading) {
        console.log('email', email);
        myFav(setFavorites, setLoading, email);
        return <div>Loading...</div>
    }
    else {
        return (
            <div className="rlist">
                {favorites.map((favorite, index) => (
                    <div key={index}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Title>{favorite.restaurantName}</Card.Title>
                            <Card.Subtitle>
                                Average Rating: {favorite.avgRating}
                            </Card.Subtitle>
                            <Button variant="primary" onClick={delFav} name={favorite.licenseNo}>Remove favorite of Restaurant?
                                <input type="text" onChange={handleChange_remfavorite} name="remfavorite"  placeholder="Y/y" />
                            </Button>
                        </Card>
                    </div>
                ))}
            </div>
        );
    }
}

export default MyFavorites;