import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchReservations = (page = 1, filters = {}) => ({
    type: types.FETCH_RESERVATIONS,
    payload: axios.get(`${window.location.origin}/api/reservation?${stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
})

export const fetchReservation = (id) => ({
    type: types.FETCH_RESERVATION,
    payload: axios.get(`${window.location.origin}/api/post/${id}`)
})


