import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchFeedbacks = (page = 1, filters = {}) => ({
    type: types.FETCH_FEEDBACKS,
    payload: axios.get(`${window.location.origin}/api/feedback?${stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
})