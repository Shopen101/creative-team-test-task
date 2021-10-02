import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Container from '@material-ui/core/Container'

import { Timer } from './components'
import { PlayGround } from './components/PlayGround'

import { setCards } from './redux/action/cardsAction'

import { cards } from './core/cardsArray'
import { shuffle } from './core/shuffleArr'

import './App.css'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCards(shuffle(cards)))
    })

    return (
        <div className="App">
            <Container maxWidth="md">
                <Timer />
                <PlayGround />
            </Container>
        </div>
    )
}

export default App
