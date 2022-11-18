import axios from "axios";

const API_URL = "http://localhost:8111/api/reviews/";
const STAFF_API = "http://localhost:8111/api/staff/";

// async function deleteReview(reviewId) {
//     console.log('reviewId', reviewId);
//     const response = await fetch(API_URL + "delete", {
//         method: 'DELETE',
//         reviewId,
//     });
//     return response.json();
// }

const deleteReview = (ratingId) => {
    return axios.delete(API_URL + "delete", {
        data: {
            ratingId,
        },
      }).then((response) => {
        console.log(response);
        return response;
      });
    }

const editReview = (ratingId, ambience, crowd, customer_service, value_for_money, taste, cooked,writtenReview) => {
    return axios.put(API_URL + "edit", {
        ratingId,
        ambience,
        crowd,
        customer_service,
        value_for_money,
        taste,
        cooked,
        writtenReview
        });
    }

const addReview = (email, review, restaurant) => {
    return axios.post(API_URL + "add", {
        email,
        review,
        restaurant
        });
    }

const addRestaurant = async (licenseNo, restaurant_name, customer_service_no, street_address, zipcode, email) => {
    return axios.post(STAFF_API + "addRestaurant", {
        licenseNo,
        restaurant_name,
        customer_service_no,
        street_address,
        zipcode,
        email
        });
    }

export {
    deleteReview,
    editReview,
    addReview,
    addRestaurant
};