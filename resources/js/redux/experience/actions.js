import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchExperiences = (filters = {}) => ({
    type: types.FETCH_EXPERIENCES,
    payload: axios.get(`${window.location.origin}/api/experience?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})