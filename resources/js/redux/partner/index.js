import { types } from "./types";

export const initialState = {
    data: [],
    meta: {},
    current: {},
    loading: false,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.UPDATE_PARTNER}_PENDING`:
        case `${types.FETCH_PARTNERS}_PENDING`:
        case `${types.FETCH_PARTNER}_PENDING`:
        case `${types.FETCH_PARTNER_FROM_URL}_PENDING`:
        case `${types.CREATE_PARTNER}_PENDING`:
            return {
                ...state,
                loading: true,

            };
        case `${types.UPDATE_PARTNER}_REJECTED`:
        case `${types.FETCH_PARTNERS}_REJECTED`:
        case `${types.FETCH_PARTNER}_REJECTED`:
        case `${types.FETCH_PARTNER_FROM_URL}_REJECTED`:
        case `${types.CREATE_PARTNER}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };

        case `${types.CREATE_PARTNER}_REJECTED`:
            return {
                ...state,
                loading: false,
            };

        case `${types.CREATE_PARTNER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [action.payload.data.data, ...state.data]
            };

        case `${types.FETCH_PARTNER_FROM_URL}_FULFILLED`:
        case `${types.FETCH_PARTNER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data
            };

        case `${types.UPDATE_PARTNER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.map(
                    (record) =>
                        record.id === action.payload.data.data.id
                            ? action.payload.data.data
                            : record
                )
            };


        case `${types.FETCH_PARTNERS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
            };

        case `${types.RESET_CURRENT_PARTNER}`:
            return {
                ...state,
                loading: false,
                current: {},
            };




        default:
            return state
    }
}