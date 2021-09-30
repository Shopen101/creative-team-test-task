import React, { useEffect } from 'react'
import './App.css'
import Container from '@material-ui/core/Container'
import { Timer, PlayGround } from './components'
import { cards } from './core/cardsArray'
import { useDispatch } from 'react-redux'
import { setCards } from './redux/action/cardsAction'
import { shuffle } from './core/shuffleArr'

function App() {
    const dispatch = useDispatch()
    const [timer, setTimer] = React.useState(0)

    const timerInt = setInterval(() => {
        setTimer(timer + 1)
    }, 1000)

    useEffect(() => {
        return () => {
            clearInterval(timerInt)
        }
    }, [timerInt])

    useEffect(() => {
        dispatch(setCards(shuffle(cards)))
    })

    return (
        <div className="App">
            <Container maxWidth="sm">
                <Timer timer={timer} />
                <PlayGround />
            </Container>
        </div>
    )
}

export default App
