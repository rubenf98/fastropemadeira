import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchBlockedDates = (page = 1, filters = {}) => ({
    type: types.FETCH_BLOCKED_DATES,
    payload: axios.get(`${window.location.origin}/api/reservation/blockDate?${stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
})

export const fetchBlockedDatesSelector = (filters = {}) => ({
    type: types.FETCH_BLOCKED_DATES_SELECTOR,
    payload: axios.get(`${window.location.origin}/api/reservation/selector/blockDate?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})


export const fetchAllBlockedDatesSelector = (filters = {}) => ({
    type: types.FETCH_ALL_BLOCKED_DATES_SELECTOR,
    payload: axios.get(`${window.location.origin}/api/fetch-blocked-dates?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})
export const deleteBlockedDate = id => ({
    type: types.DELETE_BLOCKED_DATE,
    payload: axios.delete(`${window.location.origin}/api/reservation/blockDate/${id}`),
    meta: { id }
});
