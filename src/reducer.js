
const songReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_DATA':
            return {
                ...state,
            };
        case 'TOGGLE_PLAY':
            return {
                ...state,
                isPlaying: true
            }
        case 'TOGGLE_PAUSE':
            return {
                ...state,
                isPlaying: false
            }
        default:
            return state;
    }
}

export { songReducer };