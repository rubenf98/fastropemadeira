import { types } from "./types";
import axios from "axios";
import queryString from 'query-string';

export const fetchReviews = (filters = {}) => ({
    type: types.FETCH_REVIEWS,
    payload: axios.get(`${window.location.origin}/api/reviews?${queryString.stringify(filters)}`)
})

export const fetchReview = (id) => ({
    type: types.FETCH_REVIEW,
    payload: axios.get(`${window.location.origin}/api/reviews/${id}`)
})

export const deleteReview = id => ({
    type: types.DELETE_REVIEW,
    payload: axios.delete(`${window.location.origin}/api/reviews/${id}`),
    meta: { id }
});

export const updateReview = (id, data) => ({
    type: types.UPDATE_REVIEW,
    payload: axios.post(`${window.location.origin}/api/reviews/${id}`, data),
});

export const createReview = (data) => ({
    type: types.CREATE_REVIEW,
    payload: axios.post(`${window.location.origin}/api/reviews`, data),
});

export const setCurrentReview = (data) => ({
    type: types.SET_CURRENT_REVIEW,
    payload: data,
});