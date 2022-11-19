import { useState } from 'react';
import {topPep} from "../../services/fetch.service";
import {Container ,Card, Col, Button} from 'react-bootstrap';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'
import UserReviews from './UserReviews';

function TopPep() {
    const [isLoading, setLoading] = useState(true);
    const [people, setPeople] = useState();
    const [reviewer, setReviewer] = useState("");
    const [isClicked, setIsClicked] = useState(false)
    const handleClick = (e) =>
    {
        //console.log(people)
        setIsClicked(true);
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
                    { isClicked === true ? <div> {reviewer}</div>:
                    people.map((person) => (
                        <div>
                            <Card style={{ width: '18rem' }}>
                                <Card.Title>{person.userName}</Card.Title>
                                <Card.Text>
                                    Number of Reviews : {person.numReviews}
                                </Card.Text>
                                <Link to="userReview">
                                <Button value = {person.email_id} onClick= {handleClick}> 
                                    See Reviews
                                </Button>
                                </Link>
                            </Card>
                        </div>
                    ))}
                  <Routes>
                  <Route exact path='userReview' element={< UserReviews email={reviewer}/>}></Route>
                </Routes>
            </div>
        );
    }
}

export default TopPep;