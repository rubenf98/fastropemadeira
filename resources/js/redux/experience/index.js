import { types } from "./types";

export const initialState = {
    data: [],
    meta: {},
    loading: false,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_EXPERIENCES}_PENDING`:
            return {
                ...state,
                loading: true,

            };

        case `${types.FETCH_EXPERIENCES}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
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