import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchContacts = (page = 1, filters = {}) => ({
    type: types.FETCH_CONTACTS,
    payload: axios.get(`${window.location.origin}/api/contact?${stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
})