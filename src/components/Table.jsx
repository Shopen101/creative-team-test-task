import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useSelector } from 'react-redux';
import { selectStatistics } from './../redux/reducers/selectors';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        backgroundColor: theme.palette.common.white,
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(trying, min, sec) {
    return { trying, min, sec };
}


const useStyles = makeStyles({
    table: {
        width: 400,
    },
});

export default function CustomizedTables() {
    const classes = useStyles();
    const statistics = useSelector(selectStatistics)

    const rows = statistics.map((item, _, arr) => createData(arr.length, item.min, item.sec))

    return (
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
                <TableRow>
                    <StyledTableCell align="center">Попытка</StyledTableCell>
                    <StyledTableCell align="center">Минуты прохождения игры</StyledTableCell>
                    <StyledTableCell align="center">Секунды прохождения игры</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (
                    <StyledTableRow key={index + new Date().toLocaleDateString()}>
                        <StyledTableCell align="center">{row.trying}</StyledTableCell>
                        <StyledTableCell align="center">{row.min}</StyledTableCell>
                        <StyledTableCell align="center">{row.sec}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    );
}