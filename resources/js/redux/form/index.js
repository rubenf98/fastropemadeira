import { types } from "./types";

export const initialState = {
    visible: false,
    fields: {},
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.SET_FORM_VISIBILITY}`:
            return {
                ...state,
                visible: action.payload,
            };
        case `${types.SET_FORM_FIELDS}`:
            return {
                ...state,
                fields: { ...state.fields, ...action.payload },
            };



        default:
            return state
    }
}