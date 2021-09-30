import React, { useEffect } from 'react'
import './App.css'
import Container from '@material-ui/core/Container'
import { Timer } from './components'
import { PlayGround } from './components/PlayGround'
import { cards } from './core/cardsArray'
import { useDispatch } from 'react-redux'
import { setCards } from './redux/action/cardsAction'
import { shuffle } from './core/shuffleArr'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCards(shuffle(cards)))
    })

    return (
        <div className="App">
            <Container maxWidth="sm">
                <Timer />
                <PlayGround />
            </Container>
        </div>
    )
}

export default App
