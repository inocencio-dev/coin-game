import React from 'react';
import {
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material";

function History(props) {
    return (
        <TableContainer sx={
            {
                width: '40vw',
                margin: '0 2vw',
                minHeight: '15vh',
                maxHeight: '60vh',
                overflowY: 'scroll',
                overflowX: 'hidden'
            }
        }>
            <Table>
                <TableHead>
                    <TableRow sx={{background: '#161616'}}>
                        {Object.keys(props.log[0]).map(col => {
                            return (
                                <TableCell sx={{borderBottom: 'none', height: '20px'}}>
                                    <Typography color={'primary'} sx={{fontSize: '4vh'}}>
                                        {col}
                                    </Typography>
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.log.slice(-10).map(row => {
                        return (
                            <TableRow sx={{background: '#161616'}}>
                                {Object.keys(row).map(col => {
                                    return (
                                        <TableCell sx={{borderBottom: 'none', width: 'fit-content'}}>
                                            {
                                                <Typography color={'primary'} sx={{fontSize: '2.88vh'}}>
                                                    {row[col]}
                                                </Typography>
                                            }
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default History;