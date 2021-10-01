export const setCards = arr => ({
    type: 'SET_CARDS',
    payload: arr,
})

export const setCurrentPicture = picturePath => ({
    type: 'SET_CURRENT_PICTURE',
    payload: picturePath,
})

export const setGameStatus = status => ({
    type: 'SET_GAME_STATUS',
    payload: status,
})

export const setStatistics = obj => ({
    type: 'SET_STATISTICS',
    payload: obj,
})

export const setFinalTime = obj => ({
    type: 'SET_FINAL_TIME',
    payload: obj,
})
