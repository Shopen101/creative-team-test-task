import React from 'react'
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames'

const useStyles = makeStyles({
    root: {
        borderRadius: '10px',
        background: '#fff;',
        boxShadow: '0 0 3px 0 #ccc',
        width: '100px',
        height: '100px',
        margin: '5px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px',
    },
    yellowBlock: {
        position: 'relative',
        '&::before': {
            content: '""',
            borderRadius: '10px',
            background: '#f6d365',
            display: 'block',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 100,
        },
        '&:hover::before': {
            boxShadow: '0px 0 7px 0 #ccc',

        }
    },

    checked: {
        position: 'relative',
        '&::before': {
            content: '""',
            borderRadius: '10px',
            background: '#ccc',
            display: 'block',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 100,
        },
        '&:hover::before': {
            boxShadow: '0px 0 7px 0 #ccc',

        }
    }
});

function Card({ card, onClick }) {
    const classes = useStyles();

    return (
        <div
            className={classNames(classes.root, !card.visible && classes.yellowBlock, card.checked && classes.checked)}
            onClick={onClick}
        >
            <img src={card.path} alt="pic" />
        </div >
    )
}

export default Card;
