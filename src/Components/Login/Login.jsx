import React, {useEffect, useState} from "react";
import {Button, Input, Typography} from "@mui/material";
import './Login.css';

const fieldsSX = {
    marginTop: '4vh',
    padding: '0 12%',
    width: 'fit-content',
    height: '6vh',
    color: '#ffd700',
    background: '#161616',
    fontSize: '4vh',
};


function Login(props){

    const [message, setMessage] = useState('./continue');

    useEffect(() => {
        if(localStorage.getItem('logged') === 'yes'){
            window.location = '/main';
        }
    }, []);

    function handleRedirect(){
        if(
            document.getElementById('login').value &&
            document.getElementById('password').value
        ) {
            localStorage.setItem('logged', 'yes');
            window.location = '/main';
        } else {
            setMessage('invalid input, try again');
            setTimeout(() => {
                setMessage('./continue');
            }, 2000)
        }
    }

    return(
        <div className={'login'}>
            <Typography fontSize={'20vh'} color={'#080808'} sx={
                {
                    animation: 'logoanimation infinite 22s alternate-reverse',
                    textShadow: 'ivory 0 0 4px, yellow 0 0 4px, #ffd700 0 0 40px, ivory 0 0 800px'
                }
            } variant={'h2'}>The Coin Game</Typography>
            <div>
                <Input color={'primary'} id={'login'} variant={'outlined'} sx={{...fieldsSX}} placeholder={'Login'}/>
            </div>
            <div>
                <Input id={'password'} variant={'outlined'} sx={{...fieldsSX}} placeholder={'Password'}/>
            </div>
            <div>
                <Button id={'submit'} sx={
                    {
                        ...fieldsSX,
                        ':hover': {
                            boxShadow: '#ffd700 0 0 60px',
                            background: '#ffd700',
                            color: '#080808'
                        },
                        padding: 'none'
                    }
                } variant={'outlined'} onClick={handleRedirect}>{message}</Button>
            </div>
        </div>
    );
}

export default Login;
