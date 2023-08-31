import logo from './logo.svg';
import './App.css';
import {QrScanner} from '@yudiel/react-qr-scanner';

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
        <div className="QR-widget">
            <QrScanner
                onDecode={(result) => console.log(result)}
                onError={(error) => console.log(error?.message)}
            />
        </div>

    </div>
  );
}

export default App;
