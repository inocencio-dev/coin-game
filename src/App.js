import './App.css';
import { initializeApp } from 'firebase/app';
import {useState} from 'react';
import {HashRouter, Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from './Components/Login/Login';
import {createTheme, ThemeProvider, Typography} from '@mui/material';
import Main from './Components/Main/Main';

const firebaseConfig = {
    apiKey: "AIzaSyDlqam9g6Ru50Ei9tmTj8rd_R5Q3OpuMxw",
    authDomain: "celadon-edu2022.firebaseapp.com",
    projectId: "celadon-edu2022",
    storageBucket: "celadon-edu2022.appspot.com",
    messagingSenderId: "564944460968",
    appId: "1:564944460968:web:9d7cb0f4e5c0a2ceeeb69d"

};

const app = initializeApp(firebaseConfig);

const _theme = createTheme({
    palette:{
        primary: {
            main: '#ffd700',
        },
        secondary: {
            main: '#080808',
        }
    },

    typography: {
        fontFamily: 'Visitor',
    },
});



function App() {

    return (
        <ThemeProvider theme={_theme}>
            <BrowserRouter>
                <Routes>
                    <Route path={'*'} element={
                        <Login/>
                    }/>
                    <Route path={'/'} element={<Login/>}/>
                    <Route path={'/main'} element={<Main/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
