import { types } from "./types";

export const initialState = {
    videoSrc: undefined,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.SET_VIDEO_SRC}`:
            return {
                ...state,
                videoSrc: action.payload,

            };

        default:
            return state
    }
}