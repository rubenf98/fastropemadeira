import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchExperiences = (filters = {}) => ({
    type: types.FETCH_EXPERIENCES,
    payload: axios.get(`${window.location.origin}/api/experience?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const fetchExperience = (id) => ({
    type: types.FETCH_EXPERIENCE,
    payload: axios.get(`${window.location.origin}/api/experience/${id}`)
})

export const updateExperience = (id, data) => ({
    type: types.UPDATE_EXPERIENCE,
    payload: axios.put(`${window.location.origin}/api/experience/${id}`, data),
});
