import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setGameStatus, setFinalTime } from './../redux/action/cardsAction';
import { selectGameStart } from '../redux/reducers/selectors';

function Timer() {
    const dispatch = useDispatch()

    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [intervalOfTime, setIntervalOfTime] = useState(null)

    const gameStart = useSelector(selectGameStart)

    const setTimeFunc = () => {
        setIntervalOfTime(setInterval(() => {
            if (seconds === 59) {
                setSeconds(0)
                setMinutes(minutes + 1)
                return
            }
            setSeconds(seconds + 1)
        }, 1000))
    }

    const handleStartGame = () => {
        dispatch(setGameStatus('PLAYING'))
        setTimeFunc()
    }

    useEffect(() => {
        if (gameStart === 'STOP') {
            dispatch(setFinalTime({ min: minutes, sec: seconds }))
        }
    }, [seconds, minutes])

    useEffect(() => {
        seconds >= 0 && !!intervalOfTime && setTimeFunc()
    }, [seconds])

    useEffect(() => {
        if (gameStart === 'STOP') {
            clearInterval(intervalOfTime)
        }
        return () => {
            clearInterval(intervalOfTime)
        }
    }, [intervalOfTime])

    useEffect(() => {
        if (gameStart === 'PLAYING') {
            setMinutes(0)
            setSeconds(0)
        }
    }, [gameStart])

    return (
        <Box mb={3}>
            <Typography variant="h6" gutterBottom component="div">Прошло времени: {`${minutes} минут, ${seconds} секунд`}</Typography>
            <Button onClick={handleStartGame} variant="contained" color="primary" disabled={gameStart === 'PLAYING'}>
                Начать игру!
            </Button>
        </Box>
    )
}

export default Timer;