import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchActivities = (filters = {}) => ({
    type: types.FETCH_ACTIVITIES,
    payload: axios.get(`${window.location.origin}/api/activity?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})
