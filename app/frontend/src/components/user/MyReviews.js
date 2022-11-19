import { useState } from 'react';
import axios from "axios";
import { myRev } from "../../services/fetch.service";
import { Container, Card, Col, Button } from 'react-bootstrap';
import { editReview, deleteReview } from "../../services/data.service";

function MyReviews({email}) {
    const [isLoading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [ambience, setAmbience] = useState("");
    const [crowd, setCrowd] = useState("");
    const [customer_service, setCustomerService] = useState("");
    const [value_for_money, setValueForMoney] = useState("");
    const [taste, setTaste] = useState("");
    const [cooked, setCooked] = useState("");
    const [writtenReview, setWrittenReview] = useState("");

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

    const delRev = (event) => {
        const ratingId = event.target.name;
        console.log('ratingId deleted', ratingId);
        deleteReview(ratingId);
    };

    const editRev = (event) => {
        const ratingId = event.target.name;
        editReview(ratingId, ambience, crowd, customer_service, value_for_money, taste, cooked, writtenReview);
    };

    if (isLoading) {
        console.log('email', email);
        myRev(setReviews, setLoading, email);
        return <div>Loading...</div>
    }
    else {
        return (
            <div className="rlist">
                {reviews.map((review, index) => (
                    <div key={index}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Title>{review.restaurantName}</Card.Title>
                            <Card.Subtitle>
                                Average Rating: {review.avgRating}
                            </Card.Subtitle>
                            <Card.Body>
                                <Card.Text>
                                Comment: {review.writtenReview}
                                </Card.Text>
                            </Card.Body>
                            <Button variant="primary" name={review.ratingId} onClick={delRev}>Delete Review</Button>
                            <Button variant="primary" name={review.ratingId} onClick={editRev}>Edit Review
                                <input type="text" onChange={handleChange_ambience} name="ambience"  placeholder="Ambience 0-5" />
                                <input type="text" onChange={handleChange_crowd} name="crowd"  placeholder="Crowd 0-5" />
                                <input type="text" onChange={handleChange_customer_service} name="customer_service"  placeholder="Customer service 0-5" />
                                <input type="text" onChange={handleChange_value_for_money} name="value_for_money"  placeholder="Value for money 0-5" />
                                <input type="text" onChange={handleChange_taste} name="taste"  placeholder="Taste 0-5" />
                                <input type="text" onChange={handleChange_cooked} name="cooked"  placeholder="Cooked 0-5" />
                                <input type="text" onChange={handleChange_writtenReview} name="writtenReview"  placeholder="Written review" />
                            </Button>
                        </Card>
                    </div>
                ))}
            </div>
        );
    }
}

export default MyReviews;