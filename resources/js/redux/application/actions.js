import { types } from "./types";

export const setVideoSrc = (value) => ({
    type: types.SET_VIDEO_SRC,
    payload: value
});
