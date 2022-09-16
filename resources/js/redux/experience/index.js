import { types } from "./types";

export const initialState = {
    data: [],
    meta: {},
    loading: false,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.UPDATE_EXPERIENCE}_PENDING`:
        case `${types.FETCH_EXPERIENCES}_PENDING`:
            return {
                ...state,
                loading: true,

            };
        case `${types.UPDATE_EXPERIENCE}_REJECTED`:
        case `${types.FETCH_EXPERIENCES}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };

        case `${types.UPDATE_EXPERIENCE}_FULFILLED`:
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


        case `${types.FETCH_EXPERIENCES}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
            };

        default:
            return state
    }
}