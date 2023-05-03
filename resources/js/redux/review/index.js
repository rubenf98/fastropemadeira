import { types } from "./types";

export const initialState = {
    data: [],
    current: {},
    loading: false,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.DELETE_REVIEW}_PENDING`:
        case `${types.CREATE_REVIEW}_PENDING`:
        case `${types.UPDATE_REVIEW}_PENDING`:
        case `${types.FETCH_REVIEWS}_PENDING`:
        case `${types.FETCH_REVIEW}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.UPDATE_REVIEW}_REJECTED`:
        case `${types.DELETE_REVIEW}_REJECTED`:
        case `${types.CREATE_REVIEW}_REJECTED`:
            return {
                ...state,
                loading: false,
            };


        case `${types.CREATE_REVIEW}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload.data.data]
            };

        case `${types.DELETE_REVIEW}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.UPDATE_REVIEW}_FULFILLED`:
        case `${types.SET_REVIEW_STATUS}_FULFILLED`:
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

        case `${types.FETCH_REVIEW}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };


        case `${types.FETCH_REVIEWS}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };

        case `${types.FETCH_REVIEW}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.FETCH_REVIEWS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
            };

        case `${types.SET_CURRENT_REVIEW}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        default:
            return state
    }
}