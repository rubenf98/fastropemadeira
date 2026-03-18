import { types } from "./types";

export const setVideoSrc = (value) => ({
    type: types.SET_VIDEO_SRC,
    payload: value
});


export const setLanguage = (value) => ({
    type: types.SET_LANGUAGE,
    payload: value
});
