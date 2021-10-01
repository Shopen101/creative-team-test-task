export const selectPlayGround = state => state.playGround

export const selectCards = state => selectPlayGround(state).cards
export const selectCurrentPicure = state => selectPlayGround(state).currentPicure
export const selectGameStart = state => selectPlayGround(state).gameStart
export const selectStatistics = state => selectPlayGround(state).statistics
export const selectTime = state => selectPlayGround(state).time
