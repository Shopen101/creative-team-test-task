import React from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'

function Timer() {
    const [timer, setTimer] = React.useState(0)

    const timerInt = setInterval(() => {
        setTimer(timer + 1)
    }, 1000)

    React.useEffect(() => {
        return () => {
            clearInterval(timerInt)
        }
    }, [timerInt])

    return (
        <Box mb={3}>
            <Typography variant="h6" gutterBottom component="div">Прошло времени: {timer} секунд</Typography>
        </Box>
    )
}

export default Timer;