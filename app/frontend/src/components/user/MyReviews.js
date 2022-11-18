import { useState } from 'react';
import axios from "axios";
import { myRev } from "../../services/fetch.service";
import { Container, Card, Col, Button } from 'react-bootstrap';
import { editReview, deleteReview } from "../../services/data.service";

function MyReviews({email}) {
    const [isLoading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [writtenReview, setWrittenReview] = useState("");

    const handleChange = (event) => {
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
        editReview(ratingId, writtenReview);
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
                                <input type="text" onChange={handleChange} name="ambience"  placeholder="Ambience 0-5" />
                                <input type="text" onChange={handleChange} name="crowd"  placeholder="Crowd 0-5" />
                                <input type="text" onChange={handleChange} name="customer_service"  placeholder="Customer service 0-5" />
                                <input type="text" onChange={handleChange} name="value_for_money"  placeholder="Value for money 0-5" />
                                <input type="text" onChange={handleChange} name="taste"  placeholder="Taste 0-5" />
                                <input type="text" onChange={handleChange} name="cooked"  placeholder="Cooked 0-5" />
                                <input type="text" onChange={handleChange} name="writtenReview"  placeholder="Written review" />
                            </Button>
                        </Card>
                    </div>
                ))}
            </div>
        );
    }
}

export default MyReviews;