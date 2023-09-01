import logo from './logo.svg';
import './App.css';
import {QrScanner} from '@yudiel/react-qr-scanner';

import SHCDialog from './SHCDialog'
import * as React from 'react';
import ValidationResultsDialog from "./ValidationResultsDialog";
function App() {
    const [shcDialogOpen, setShcDialogOpen] = React.useState(false);
    const [validationResultsDialogOpen, setValidationResultsDialogOpen] = React.useState(false);

    const [shcString, setShcString] = React.useState("");
    const [validationResults, setValidationResults] = React.useState({})
    const [sessionId, setSessionId] = React.useState(null)
    const handleQRDecode = (value) => {
        setShcString(value);
        setShcDialogOpen(true);
    }

    const handleValidationResultsDialogClose = () => {
        setValidationResultsDialogOpen(false);
    }

    const handleSHCDialogClose = (value) => {
        if (value) {
            setSessionId(value.sessionId)
            setValidationResults(value)
            setValidationResultsDialogOpen(true);
        }
        setShcDialogOpen(false);
    };
  return (
    <div className="App">
        <div className="QR-widget">
            <QrScanner
                onDecode={(result) =>
                   handleQRDecode(result)
                }
                onError={(error) => console.log(error?.message)}
            />
            Hey you. Put your SHC QR code in the box until a dialog appears.
        </div>
        <SHCDialog open={shcDialogOpen}
                   onClose={handleSHCDialogClose}
                   sessionId={sessionId}
                   shcValue={shcString}
                   setValidationResults={setValidationResults}
        ></SHCDialog>
        <ValidationResultsDialog onClose={handleValidationResultsDialogClose}
                                 open={validationResultsDialogOpen}
                                 validationResults={validationResults} >
        </ValidationResultsDialog>

    </div>
  );
}

export default App;
