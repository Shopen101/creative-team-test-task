import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import store from './redux/store'

ReactDOM.render(
    <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
            <App />
        </Provider>
    </SnackbarProvider>,
    document.getElementById('root'),
)
