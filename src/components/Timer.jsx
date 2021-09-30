import React from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'

function Timer({timer}) {
    return (
        <Box mb={3}>
            <Typography variant="h6" gutterBottom component="div">Прошло времени: {timer} секунд</Typography>
        </Box>
    )
}

export default Timer;