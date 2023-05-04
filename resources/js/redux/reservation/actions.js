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
    payload: axios.get(`${window.location.origin}/api/reservation/${id}`)
})

export const fetchDisabledDate = (filters = {}) => ({
    type: types.FETCH_DISABLED_DATES,
    payload: axios.get(`${window.location.origin}/api/reservation/disabledDate?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const deleteReservation = id => ({
    type: types.DELETE_RESERVATION,
    payload: axios.delete(`${window.location.origin}/api/reservation/${id}`),
    meta: { id }
});

export const updateReservation = (id, data) => ({
    type: types.UPDATE_RESERVATION,
    payload: axios.put(`${window.location.origin}/api/reservation/${id}`, data),
});

export const createExternalReservation = (data) => ({
    type: types.CREATE_EXTERNAL_RESERVATION,
    payload: axios.post(`${window.location.origin}/api/external-reservation`, data),
});

export const blockReservationDate = (data) => ({
    type: types.BLOCK_RESERVATION_DATE,
    payload: axios.post(`${window.location.origin}/api/reservation/blockDate`, data),
});

