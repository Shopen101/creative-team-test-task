export const selectPlayGround = state => state.playGround

export const selectCards = state => selectPlayGround(state).cards
export const selectCurrentPicure = state => selectPlayGround(state).currentPicure
