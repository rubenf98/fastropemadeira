import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchPartners = (filters = {}) => ({
    type: types.FETCH_PARTNERS,
    payload: axios.get(`${window.location.origin}/api/partners?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const fetchPartner = (id) => ({
    type: types.FETCH_PARTNER,
    payload: axios.get(`${window.location.origin}/api/partners/${id}`)
})

export const fetchPartnerFromUrl = (filters = {}) => ({
    type: types.FETCH_PARTNER_FROM_URL,
    payload: axios.get(`${window.location.origin}/api/partner-from-url?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const updatePartner = (id, data) => ({
    type: types.UPDATE_PARTNER,
    payload: axios.put(`${window.location.origin}/api/partners/${id}`, data),
});

export const createPartner = (data) => ({
    type: types.CREATE_PARTNER,
    payload: axios.post(`${window.location.origin}/api/partners`, data),
});



export const resetCurrentPartner = () => ({
    type: types.RESET_CURRENT_PARTNER,
});
