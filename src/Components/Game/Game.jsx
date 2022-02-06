import React, {useEffect, useState} from 'react';
import {Accordion, Button, Input, Typography} from "@mui/material";
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
    const [poverty, setPoverty] = useState(0);

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
        coeffCalc();
        if (/\d/.test(bet[bet.length - 1]) || !bet) {
            setMinMax(0, Number(props.coins));
        }
    }, [bet]);

    useEffect(() => {
        if(props.coins <= 0){
            setPoverty(1);
        }
    },[props.coins]);

    function setMinMax(min, max) {
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

    function appendLog(prev, curr){
        const diff = (1 - (Number(prev)/Number(curr))).toFixed(4);
        const dyna = prev < curr ? 'rise' : 'fall';
        const intel = {
            '#': props.log[props.log.length - 1]['#'] + 1, // funny
            balance: curr.toFixed(2),
            side: side ? 'heads' : 'tails',
            difference: (diff * 100).toFixed(2) + '%',
            dynamics: dyna
        }
        let res = props.log;
        res.push(intel)
        props.setLog(res);
    }

    function countCash() {
        let res = null
        const flip = coinFlip();
        const prevCoins = props.coins;
        if (flip === side) { // win
            props.setStreak(props.streak + 1);
            res = (Number(coeff) * bet + Number(props.coins));

        } else { // loss
            props.setStreak(0);
            res = (Number(props.coins) - bet);
        }
        props.setCoins(res.toFixed(2));
        appendLog(prevCoins, res, flip);
    }

    function handleBet(e) {
        setBet(e.target.value);
    }

    return (
        <div>
            <Input sx={{...fieldsSX}} placeholder={'bet'} value={bet} type={'number'}
                   onChange={(e) => {
                       handleBet(e)
                   }}/>
            <Typography sx={{...labelsSX}}>
                coefficient: {coeff ? coeff : 0}
            </Typography>
            <div>
                <Button disabled={poverty} sx={{...smallerbuttonSX}} onClick={() => {
                    setSide(1);
                }}>Heads</Button>
                <Button disabled={poverty} sx={{...smallerbuttonSX}} onClick={() => {
                    setSide(0);
                }}>Tails</Button>
            </div>
            <Button disabled={(poverty || bet === '' || side === undefined || !coeff)}
                    onClick={countCash} sx={{...buttonSX}} color={'primary'}>
                ./makebet on "{side ? 'Heads' : 'Tails'}"
            </Button>
            <div>
                <Button onClick={() => {
                    props.setCoins(props.log[0]['coins'].toFixed(2));
                    props.setLog([props.log[0]]);
                    setPoverty(0);
                }} sx={{...buttonSX}} color={'primary'}>
                    ./restart
                </Button>
            </div>
        </div>
    );
}

export default Game;