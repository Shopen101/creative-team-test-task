import { combineReducers } from 'redux'
import { cardsReducer } from './cardReducer'

const rootReducer = combineReducers({
    playGround: cardsReducer,
})

export default rootReducer
