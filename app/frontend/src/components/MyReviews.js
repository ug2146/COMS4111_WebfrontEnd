import { useState } from 'react';
import axios from "axios";
import { myRev } from "../services/fetch.service";
import { Container, Card, Col, Button } from 'react-bootstrap';
import { editReview, deleteReview } from "../services/data.service";

function MyReviews({email}) {
    const [isLoading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [writtenReview, setWrittenReview] = useState("");

    const handleChange = (event) => {
        console.log('value', event.target.value);
        setWrittenReview(event.target.value);
    };

    const delRev = (event) => {
        const reviewId = event.target.name;
        console.log('reviewId deleted', reviewId);
        deleteReview(reviewId);
    };

    const editRev = (event) => {
        const reviewId = event.target.name;
        editReview(reviewId, writtenReview);
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
                            <Card.Title>{review.reviewId}</Card.Title>
                            <Card.Subtitle>
                                {review.restaurantName}
                            </Card.Subtitle>
                            <Card.Body>
                                <Card.Text>
                                {review.writtenReview}
                                </Card.Text>
                            </Card.Body>
                            <Button variant="primary" name={review.reviewId} onClick={delRev}>Delete Review</Button>
                            <Button variant="primary" name={review.reviewId} onClick={editRev}>Edit Review
                                <input type="text" onChange={handleChange} name="writtenReview"  placeholder="Update your review" />
                            </Button>
                        </Card>
                    </div>
                ))}
            </div>
        );
    }
}

export default MyReviews;