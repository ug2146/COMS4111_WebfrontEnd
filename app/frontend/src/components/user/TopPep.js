import { useState } from 'react';
import axios from "axios";
import {topPep} from "../../services/fetch.service";
import {Container ,Card, Col, Button} from 'react-bootstrap';
function TopPep() {
    const [isLoading, setLoading] = useState(true);
    const [people, setPeople] = useState();
    if(isLoading) {
        topPep(setPeople, setLoading);
        return <div>Loading...</div>
    }
    else
    {
        return (
            <div className = "rlist">
                    {people.map((person) => (
                        <div>
                            <Card style={{ width: '18rem' }}>
                                <Card.Title>{person.userName}</Card.Title>
                                <Card.Text>
                                    Number of Reviews : {person.numReviews}
                                </Card.Text>
                                <Button variant="primary">Go to the Reviewer's Page</Button>
                            </Card>
                        </div>
                    ))}
            </div>
        );
    }
}

export default TopPep;