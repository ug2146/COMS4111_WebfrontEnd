import axios from "axios";

const API_URL = "http://localhost:8111/api/";

// async function deleteReview(reviewId) {
//     console.log('reviewId', reviewId);
//     const response = await fetch(API_URL + "delete", {
//         method: 'DELETE',
//         reviewId,
//     });
//     return response.json();
// }

const deleteReview = (ratingId) => {
    return axios.delete(API_URL + "reviews/delete", {
        data: {
            ratingId,
        },
      }).then((response) => {
        console.log(response);
        return response;
      });
    }

const editReview = (ratingId, ambience, crowd, customer_service, value_for_money, taste, cooked, writtenReview) => {
    return axios.put(API_URL + "reviews/edit", {
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

const addReview = (email, ambience, crowd, customer_service, value_for_money, taste, cooked, writtenReview, restaurant_license) => {
    return axios.post(API_URL + "reviews/add", {
        email,
        ambience,
        crowd,
        customer_service,
        value_for_money,
        taste,
        cooked,
        writtenReview,
        restaurant_license
        });
    }

const addFavorite = (email, restaurant_license, fav_value) => {
    return axios.post(API_URL + "favorite/add", {
        email,
        restaurant_license,
        fav_value
        });
}

const delFavorite = (email, restaurant_license, rem_value) => {
    return axios.post(API_URL + "favorite/delete", {
        email,
        restaurant_license,
        rem_value
        });
}

export {
    deleteReview,
    editReview,
    addReview,
    addFavorite,
    delFavorite
};