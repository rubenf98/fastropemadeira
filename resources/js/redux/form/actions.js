import { types } from "./types";

export const setFormVisibility = (data) => ({
    type: types.SET_FORM_VISIBILITY,
    payload: data,
});

export const setFormFields = (data) => ({
    type: types.SET_FORM_FIELDS,
    payload: data,
});
