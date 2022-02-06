import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow
} from '@mui/material';

const players = [
    {
        name: 'Nikita Mikhalkoff',
        highscore: 9999,
        'max streak': 8
    },
    {
        name: 'Linus Torvalds',
        highscore: 'core dump',
        'max streak': 'fuck nvidia'
    },
    {
        name: 'Dmitry Porubov',
        highscore: 4000,
        'max streak': '12'
    },
    {
        name: 'Richard Stallman',
        highscore: 187261,
        'max streak': 192
    },
    {
        name: 'Jacques Fresco',
        highscore: 88711,
        'max streak': 992
    },
    {
        name: 'Stephen Hawking',
        highscore: 0,
        'max streak': 0
    },
    {
        name: 'Bob Ross',
        highscore: 999919,
        'max streak': 222222
    },
    {
        name: 'Gennady',
        highscore: -9999999,
        'max streak': '-1'
    }
];

if(!localStorage.getItem('leaderboard')){
    localStorage.setItem('leaderboard', JSON.stringify(players));
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const buttonSX={
    border: '#ffd700 1px solid',
    marginLeft: '1vw',
    background: '#161616'
};

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2, background: '#080808' }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: '#ffd700'
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function Leaderboard() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button sx={{...buttonSX}} variant='outlined' onClick={handleClickOpen}>
                <Typography variant='h4' component='div' sx={{ flexGrow: 1 }}>
                    Leaderboard
                </Typography>
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby='customized-dialog-title'
                open={open}
            >
                <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
                    <Typography color={'primary'} sx={{fontSize: '6vh', margin: '1vw'}}>Leaderboard</Typography>
                </BootstrapDialogTitle>
                <DialogContent sx={{background: '#080808'}}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{background: '#161616'}}>
                                    {Object.keys(JSON.parse(localStorage.getItem('leaderboard'))[0]).map(col => {
                                        return(
                                            <TableCell key={col} sx={{borderBottom: 'none'}}>
                                                <Typography color={'primary'} sx={{fontSize: '4vh'}}>
                                                    {col}
                                                </Typography>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {players.map(player => {
                                    return(
                                        <TableRow key={player.name} sx={{background: '#161616', border: 'none'}}>
                                            {Object.keys(JSON.parse(localStorage.getItem('leaderboard'))[0]).map(field => {
                                                return(
                                                    <TableCell sx={{borderBottom: 'none'}}>
                                                        <Typography color={'primary'} sx={{fontSize: '3vh'}}>
                                                            {player[field]}
                                                        </Typography>
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default Leaderboard;