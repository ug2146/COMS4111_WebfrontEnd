import { useState } from 'react';
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
                                <Card.Title>{person}</Card.Title>
                                <Card.Text>
                                    {/*{person}*/}
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