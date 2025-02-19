import { types } from "./types";

export const initialState = {
    data: [],
    selector: [],
    meta: {},
    links: {},
    loading: false,
    current: {},
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_BLOCKED_DATES}_PENDING`:
        case `${types.FETCH_BLOCKED_DATES_SELECTOR}_PENDING`:
        case `${types.FETCH_ALL_BLOCKED_DATES_SELECTOR}_PENDING`:

        case `${types.DELETE_BLOCKED_DATE}_PENDING`:
        case `${types.DELETE_BLOCKED_DATE}_REJECTED`:
            return {
                ...state,
                loading: true,

            };

        case `${types.FETCH_BLOCKED_DATES_SELECTOR}_REJECTED`:
        case `${types.FETCH_ALL_BLOCKED_DATES_SELECTOR}_REJECTED`:
            return {
                ...state,
                loading: false,
                selector: []
            };

        case `${types.FETCH_BLOCKED_DATES_SELECTOR}_FULFILLED`:
        case `${types.FETCH_ALL_BLOCKED_DATES_SELECTOR}_FULFILLED`:
            return {
                ...state,
                loading: false,
                selector: action.payload.data,
            };

        case `${types.FETCH_BLOCKED_DATES}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };

        case `${types.FETCH_BLOCKED_DATES}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
                links: action.payload.data.links
            };

        case `${types.DELETE_BLOCKED_DATE}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        default:
            return state
    }
}