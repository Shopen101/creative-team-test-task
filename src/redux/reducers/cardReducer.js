const initialState = {
    cards: [],
    currentPicure: null
}

export const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CARDS': {
            return {
                ...state,
                cards: [...action.payload],
            }
        }

        case 'SET_CURRENT_PICTURE': {
            return {
                ...state,
                currentPicure: action.payload,
            }
        }

        default: {
            return {
                ...state,
            }
        }
    }
}
