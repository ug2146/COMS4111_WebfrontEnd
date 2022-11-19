import { useState } from 'react';
import {topPep} from "../../services/fetch.service";
import {Container ,Card, Col, Button} from 'react-bootstrap';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'
import UserReviews from './UserReviews';

function TopPep() {
    const [isLoading, setLoading] = useState(true);
    const [people, setPeople] = useState();
    const [reviewer, setReviewer] = useState("");
    const handleClick = (e) =>
    {
        setReviewer(e.target.value);
    }
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
                                <Link to="userReview">
                                <Button value = {person} onClick= {handleClick}> 
                                    See Reviews
                                </Button>
                                </Link>
                            </Card>
                        </div>
                    ))}
                  <Routes>
                  <Route exact path='userReview' element={< UserReviews email={reviewer}/>}></Route>
                  <Route path="*" element={<p>Path not resolved</p>} />
                </Routes>
            </div>
        );
    }
}

export default TopPep;