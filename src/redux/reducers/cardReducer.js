const initialState = {
    cards: [],
    currentPicure: null,
    gameStart: 'NEVER', // NEVER - ни разу не играл, PLAYING - играет сейчас, STOP - закончил игру
    statistics: [],
    time: {}
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

        case 'SET_GAME_STATUS': {
            return {
                ...state,
                gameStart: action.payload,
            }
        }

        case 'SET_STATISTICS': {
            return {
                ...state,
                statistics: [...state.statistics, action.payload],
            }
        }

        case 'SET_FINAL_TIME': {
            return {
                ...state,
                time: action.payload,
            }
        }

        default: {
            return {
                ...state,
            }
        }
    }
}
