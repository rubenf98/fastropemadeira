import { types } from "./types";

export const initialState = {
    videoSrc: undefined,
    language: localStorage.getItem("language") || "en"
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.SET_VIDEO_SRC}`:
            return {
                ...state,
                videoSrc: action.payload,

            };
        case `${types.SET_LANGUAGE}`:
            return {
                ...state,
                language: action.payload,
            };
        default:
            return state
    }
}