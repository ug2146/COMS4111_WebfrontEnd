import axios from "axios";

const API_URL = "http://localhost:8111/api/reviews/";

// async function deleteReview(reviewId) {
//     console.log('reviewId', reviewId);
//     const response = await fetch(API_URL + "delete", {
//         method: 'DELETE',
//         reviewId,
//     });
//     return response.json();
// }

const deleteReview = (reviewId) => {
    return axios.delete(API_URL + "delete", {
        data: {
            reviewId,
        },
      }).then((response) => {
        console.log(response);
        return response;
      });
    }

const editReview = (reviewId, writtenReview) => {
    return axios.put(API_URL + "edit", {
        reviewId,
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

export {
    deleteReview,
    editReview,
    addReview
};