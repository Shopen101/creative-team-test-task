import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import { makeStyles } from '@material-ui/core/styles'
import { selectGameStart } from '../redux/reducers/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { setGameStatus } from '../redux/action/cardsAction'
import Table from './Table'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function SimpleBackdrop() {
    const classes = useStyles();

    const dispatch = useDispatch()
    const gameStart = useSelector(selectGameStart)

    const handleClose = () => {
        dispatch(setGameStatus('NEVER'))
    }

    return (
        <div>
            <Backdrop className={classes.backdrop} open={gameStart === 'STOP'} onClick={handleClose}>
                <Table />
            </Backdrop>
        </div>
    );
}