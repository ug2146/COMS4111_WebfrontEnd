import { useState } from 'react';
import axios from "axios";
import { myRev } from "../../services/fetch.service";
import { Container, Card, Col, Button } from 'react-bootstrap';
import { editReview, deleteReview } from "../../services/data.service";

function UserReviews({email}) {
    const [isLoading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

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
                        </Card>
                    </div>
                ))}
            </div>
        );
    }
}

export default UserReviews;