export const setCards = arr => ({
    type: 'SET_CARDS',
    payload: arr,
})

export const setCurrentPicture = picturePath => ({
    type: 'SET_CURRENT_PICTURE',
    payload: picturePath,
})
