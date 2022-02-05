import React, {useState, useEffect} from 'react';
import {Accordeon, AppBar, Box, Button, Divider, IconButton, Toolbar, Typography} from '@mui/material';
import {Menu} from '@material-ui/icons';
import './Main.css';
import Game from '../Game/Game';
import Leaderboard from '../Leaderboard/Leaderboard';

function Main(props) {
    const [coins, setCoins] = useState((1000).toFixed(2));
    // sides: head or tail
    // the coin doesn't exist
    // but soon it will

    const buttonSX={
        border: '#ffd700 1px solid',
        marginLeft: '1vw',
        background: '#161616'
    };

    function handleLogout() {
        localStorage.removeItem('logged');
        window.location = '/';
    }

    useEffect(() => {
        if(localStorage.getItem('logged') !== 'yes'){
            alert('scammers are not allowed!');
            window.location = '/';
        }
    }, []);

    return (
        <div className={'casino'}>
            <Box sx={{ flexGrow: 1 }} sx={{width: '100vw'}}>
                <AppBar position={'static'} sx={{width: '100vw'}}>
                    <Toolbar sx={{background: '#242424', height: '8vh'}}>
                        <Typography color={'primary'} variant='h4' component='div' sx={{ flexGrow: 1 }}>
                            {coins} Coins
                        </Typography>
                        <Button onClick={handleLogout} sx={{...buttonSX}} color={'primary'}><Typography variant='h4' component='div' sx={{ flexGrow: 1 }}>
                            ./logout
                        </Typography></Button>
                        <Leaderboard color={'primary'}/>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className={'playarea'}>
                <Game coins={coins} setCoins={setCoins}/>
            </div>
        </div>
    );
}

export default Main;