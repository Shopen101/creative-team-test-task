import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import BackDrop from './BackDrop'
import Card from './Card'
import { setGameStatus } from '../redux/action/cardsAction'

import { selectCards, selectCurrentPicure, selectGameStart, selectStatistics, selectTime } from '../redux/reducers/selectors';
import { setCards, setCurrentPicture, setStatistics } from '../redux/action/cardsAction';

import { useSnackbar } from 'notistack'

import classNames from 'classnames'

const useStyles = makeStyles({
    root: {
        borderRadius: '10px',
        background: '#fff',
        boxShadow: '0 0 5px 0 #ccc',
        width: '700px',
        height: '700px',
        margin: '0 auto',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-evenly',
        alignContent: 'space-evenly'
    },
    blockClick: {
        pointerEvents: 'none',
        cursor: 'default'
    },
    blockGame: {
        opacity: 0.5,
        pointerEvents: 'none',
    }
});

export const PlayGround = React.memo(() => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const cards = useSelector(selectCards)
    const currentPicture = useSelector(selectCurrentPicure)
    const gameStart = useSelector(selectGameStart)
    const statistics = useSelector(selectStatistics)
    const finalTime = useSelector(selectTime)

    const { enqueueSnackbar } = useSnackbar()

    const [blockClickPlayground, setBlockClickPlayground] = useState(false)
    const [isUserSetFirstCard, setIsUserSetFirstCard] = useState(false)

    useEffect(() => {
        let checkedCard = 0
        cards.forEach(card => {
            if (card.checked) {
                checkedCard++
            }
        })

        if (checkedCard === 36) {
            dispatch(setGameStatus('STOP'))
            dispatch(setStatistics({ trying: statistics.length, min: finalTime.min, sec: finalTime.sec }))
        }
    }, [cards, dispatch])

    useEffect(() => {
        let timeOut = null
        if (isUserSetFirstCard) {
            timeOut = setTimeout(() => {
                const newCardsArr = cards.map((card) => {
                    return {
                        ...card,
                        visible: false
                    }

                })
                dispatch(setCurrentPicture(null))
                dispatch(setCards(newCardsArr))
                setIsUserSetFirstCard(false)
            }, 5000)
        }

        return () => timeOut && clearTimeout(timeOut)
    }, [isUserSetFirstCard, dispatch])

    const handleCardClick = (cardClick) => {
        if (gameStart === 'NEVER' || gameStart === 'STOP') {
            enqueueSnackbar('Сначала необходимо запустить игру!', { variant: 'error' })
        }
        else {
            if (currentPicture) {
                if (cardClick.path === currentPicture.path) {
                    enqueueSnackbar('Нельзя кликать на тот же самый квадрат!', { variant: 'error' });
                } else {
                    setIsUserSetFirstCard(false)
                    setBlockClickPlayground(true)
                    if (currentPicture.name === cardClick.name) {
                        const newCardsArr = cards.map((card) => {
                            if (card.name === cardClick.name) {
                                return {
                                    ...card,
                                    visible: true
                                }
                            } else {
                                return card
                            }
                        })

                        dispatch(setCards(newCardsArr))

                        // закрыть
                        setTimeout(() => {
                            const newCardsArr = cards.map((card) => {
                                if (card.name === cardClick.name) {
                                    return {
                                        ...card,
                                        visible: true,
                                        checked: true
                                    }
                                } else {
                                    return card
                                }
                            })
                            setBlockClickPlayground(false)
                            dispatch(setCards(newCardsArr))
                        }, 300);
                    } else {
                        // открыть
                        const newCardsArr = cards.map((card) => {
                            if (card.path === cardClick.path) {
                                return {
                                    ...card,
                                    visible: true
                                }
                            } else {
                                return card
                            }
                        })

                        dispatch(setCards(newCardsArr))

                        // закрыть
                        setTimeout(() => {
                            const newCardsArr = cards.map((card) => {
                                return {
                                    ...card,
                                    visible: false
                                }

                            })
                            setBlockClickPlayground(false)
                            dispatch(setCards(newCardsArr))
                        }, 300);
                    }
                    dispatch(setCurrentPicture(null))
                }

            } else {
                dispatch(setCurrentPicture(cardClick))
                setIsUserSetFirstCard(true)

                const newCardsArr = cards.map((card) => {
                    if (card.path === cardClick.path) {
                        return {
                            ...card,
                            visible: true
                        }
                    } else {
                        return card
                    }
                })
                dispatch(setCards(newCardsArr))
            }
        }
    }

    return (
        <div
            className={
                classNames(classes.root,
                    blockClickPlayground && classes.blockClick,
                    gameStart === 'NEVER' && classes.blockGame)
            }>
            <BackDrop />
            {
                cards.map((card, index) => {
                    const onClick = () => handleCardClick(card)

                    return (
                        <Card key={card.path + index} card={card} onClick={onClick} />
                    )
                })
            }

        </div>
    )
})
