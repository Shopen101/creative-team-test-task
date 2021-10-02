import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { selectGameStart } from '../redux/reducers/selectors'
import { useDispatch, useSelector } from 'react-redux'
import Table from './Table'
import Backdrop from '@material-ui/core/Backdrop'
import Button from '@material-ui/core/Button';
import { setCards, setCurrentPicture, setFinalTime, setGameStatus } from '../redux/action/cardsAction'
import { cards } from '../core/cardsArray'
import { shuffle } from '../core/shuffleArr'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        display: 'flex',
        flexFlow: 'column wrap',
    },
    backdropBtn: {
        marginTop: '20px'
    }
}));

export default function SimpleBackdrop() {
    const classes = useStyles();

    const dispatch = useDispatch()
    const gameStart = useSelector(selectGameStart)

    const handleClose = () => {
        dispatch(setGameStatus('NEVER'))
        dispatch(setFinalTime({}))
        dispatch(setCurrentPicture(null))
        dispatch(setCards(shuffle(cards)))
    }
    
    const handleRestartGame = () => {
        setTimeout(() => {
            dispatch(setGameStatus('PLAYING'))
        }, 0) 
        dispatch(setFinalTime({}))
        dispatch(setCurrentPicture(null))
        dispatch(setCards(shuffle(cards)))
    }

    return (
        <Backdrop className={classes.backdrop} open={gameStart === 'STOP'} onClick={handleClose}>
            <Table />
            <Button variant="contained" color="secondary" className={classes.backdropBtn} onClick={handleRestartGame}>Сыграть ещё раз</Button>
        </Backdrop>
    );
}