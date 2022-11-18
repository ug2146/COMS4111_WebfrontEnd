import { useState } from 'react';
import axios from "axios";
import { staffRes } from "../../services/fetch.service";
import { Container, Card, Col, Button } from 'react-bootstrap';

function StaffRestaurant({restaurant}) {
    return(
        <div>
            Hello {restaurant}
        </div>
    );
}

export default StaffRestaurant;