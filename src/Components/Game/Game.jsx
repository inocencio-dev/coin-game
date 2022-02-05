import React, {useEffect, useState} from 'react';
import {Button, Input, Typography} from "@mui/material";
import './Game.css';

function Game(props) {

    const buttonSX = {
        border: '#ffd700 1px solid',
        color: '#ffd700',
        background: '#161616',
        width: '20vw',
        fontSize: '4vh',
        margin: '1vh 0'
    };

    const smallerbuttonSX = {
        border: '#ffd700 1px solid',
        color: '#ffd700',
        background: '#161616',
        width: '8vw',
        height: '4vh',
        fontSize: '3vh',
        margin: '1vh 1vw'
    };

    const fieldsSX = {
        marginTop: '4vh',
        width: '20vw',
        height: '6vh',
        padding: '0 12%',
        color: '#ffd700',
        background: '#161616',
        fontSize: '4vh',
    };

    const labelsSX = {
        textAlign: 'center',
        maxWidth: '20vw',
        wordWrap: 'break-word',
        margin: '4vh 0',
        fontSize: '6vh',
        color: '#ffd700',
        lineHeight: '60%',
    };

    const [bet, setBet] = useState('');
    const [coeff, setCoeff] = useState(undefined);
    const [side, setSide] = useState(undefined); // heads or tails

    function coeffCalc() {
        if (!bet) {
            setCoeff(undefined);
        } else {
            setCoeff(
                (1 + (1 / (Math.pow(Math.PI * 0.1, bet) + (Math.log(bet))))).toFixed(2)
            );
        }
    }

    // useState hook is NOT asynchronous and it captures only previous state,
    // but there are ways to solve problems - using useEffect hook.

    useEffect(() => {
        if (/\d/.test(bet[bet.length - 1]) || !bet) {
            setMinMax(0, Number(props.coins));
            coeffCalc();
        }
    }, [bet]);

    function setMinMax(min, max) {
        console.log('c now: ', coeff);
        if (bet < min) {
            setBet(max);
        }
        if (bet > max || bet === '0') {
            setBet('');
        }
    }

    function coinFlip() {
        return Math.round(Math.random()); // tail(0) or head(1)
    }

    function countCash() {
        if (coinFlip() === 1) { // win
            return (Number(coeff) * bet + Number(props.coins)).toFixed(2);
        } else { // loss
            return (Number(props.coins) - bet).toFixed(2);
        }
    }

    function handleBet(e){
        setBet(e.target.value);
    }

    return (
        <div>
            <Input sx={{...fieldsSX}} placeholder={'bet'} value={bet} type={'number'}
                   onChange={(e) => {handleBet(e)}}/>
            <Typography sx={{...labelsSX}}>
                coefficient: {coeff ? coeff : 0}
            </Typography>
            <div>
                <Button sx={{...smallerbuttonSX}} onClick={() => {
                    if (!side) setSide(1);
                }}>Heads</Button>
                <Button sx={{...smallerbuttonSX}} onClick={() => {
                    if (side) setSide(0);
                }}>Tails</Button>
            </div>
            <Button disabled={(bet === '' || side === undefined || coeff === undefined)}
                    onClick={() => {props.setCoins(countCash)}} sx={{...buttonSX}} color={'primary'}>
                ./makebet on "{side ? 'Heads' : 'Tails'}"
            </Button>
        </div>
    );
}

export default Game;