import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDlqam9g6Ru50Ei9tmTj8rd_R5Q3OpuMxw",
  authDomain: "celadon-edu2022.firebaseapp.com",
  projectId: "celadon-edu2022",
  storageBucket: "celadon-edu2022.appspot.com",
  messagingSenderId: "564944460968",
  appId: "1:564944460968:web:b75dd5dd75b5b663eeb69d"
};

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
