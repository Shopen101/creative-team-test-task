import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';

import Card from './Card'

import { selectCards, selectCurrentPicure } from '../redux/reducers/selectors';
import { setCards, setCurrentPicture } from '../redux/action/cardsAction';

import { useSnackbar } from 'notistack'

import classNames from 'classnames'

const useStyles = makeStyles({
    root: {
        borderRadius: '10px',
        background: '#eaeaea',
        boxShadow: '0 0 5px 0 #ccc',
        width: '400px',
        height: '400px',
        margin: '0 auto',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-evenly',
        alignContent: 'space-evenly'
    },
    blockClick: {
        pointerEvents: 'none',
        cursor: 'default'
    }
});

export const PlayGround = React.memo(() => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const cards = useSelector(selectCards)
    const currentPicture = useSelector(selectCurrentPicure)

    const { enqueueSnackbar } = useSnackbar()

    const [blockClickPlayground, setBlockClickPlayground] = useState(false)

    const handleCardClick = (cardClick) => {
        if (currentPicture) {
            if (cardClick.path === currentPicture.path) {
                enqueueSnackbar('Нельзя кликать на тот же самый квадрат!', { variant: 'error' });
            } else {
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
                    }, 500);
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
                    }, 1500);
                }
                dispatch(setCurrentPicture(null))
            }

        } else {
            dispatch(setCurrentPicture(cardClick))

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

    return (
        <div className={classNames(classes.root, blockClickPlayground && classes.blockClick)}>
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
