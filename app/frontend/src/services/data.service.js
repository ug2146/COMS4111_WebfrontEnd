import axios from "axios";

const API_URL = "http://localhost:8111/api/";
const STAFF_API = "http://localhost:8111/api/staff/";
const RESTAURANT_API = "http://localhost:8111/api/restaurant/";
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

const addDish = async (dish_name, dish_category, price, licenseNo) => {
    return axios.post(RESTAURANT_API + "addDish", {
        dish_name,
        dish_category,
        price,
        licenseNo
        });
    }

const delDish = (dish_id) => {
    console.log(dish_id)
    return axios.post(STAFF_API + "delDish", {
        dish_id
    });
};

const addOffer = async (license_no, percentage_discount, offer_description, valid_till) => {
    return axios.post(STAFF_API + "provideOffers", {
        license_no,
        percentage_discount,
        offer_description,
        valid_till
        });
    }

const delOffer = (offerId) => {
    console.log(offerId)
    return axios.post(STAFF_API + "deleteOffers", {
        offerId
    });
};

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
    addRestaurant,
    addDish,
    delDish,
    addFavorite,
    delFavorite,
    addOffer,
    delOffer
};