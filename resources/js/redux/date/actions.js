import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchBlockedDates = (page = 1, filters = {}) => ({
    type: types.FETCH_BLOCKED_DATES,
    payload: axios.get(`${window.location.origin}/api/reservation/blockDate?${stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
})

export const deleteBlockedDate = id => ({
    type: types.DELETE_BLOCKED_DATE,
    payload: axios.delete(`${window.location.origin}/api/reservation/blockDate/${id}`),
    meta: { id }
});
