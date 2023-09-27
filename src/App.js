import logo from './logo.svg';
import './App.css';
import {QrScanner} from '@yudiel/react-qr-scanner';

import SHCDialog from './SHCDialog'
import * as React from 'react';
import ValidationResultsComponent from "./ValidationResultsComponent";
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
function App() {
    const [shcDialogOpen, setShcDialogOpen] = React.useState(false);
    const [validationResultsDialogOpen, setValidationResultsDialogOpen] = React.useState(false);

    const [shcString, setShcString] = React.useState("");
    const [validationResults, setValidationResults] = React.useState(null)
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

    const handleBack = () => {
        setValidationResults(null);
    }
  return (
      <Box sx={{ flexGrow: 1
      }}>
          <AppBar position="static">

              <Toolbar>
                  { validationResults &&
                      <Button color="inherit" onClick={handleBack}>Back</Button>
                  }
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      HL7 FHIR : Smart Health Card Validator
                  </Typography>
              </Toolbar>

          </AppBar>
        {
            !validationResults
                ? <Box  sx={{
                   alignItems : 'center',
                   justifyContent : 'center'
                }}


                >   <Box
                    sx={{
                        margin: 'auto',
                    width: 1 / 2,
                    height: 1 / 2,
                }}>
                    <Typography variant="h5"  sx={{ flexGrow: 1,
                        'text-align': 'center'}}>
                        Use your webcam to capture your QR code in the box.
                    </Typography>
                    <QrScanner
                        onDecode={(result) =>
                            handleQRDecode(result)
                        }
                        onError={(error) => console.log(error?.message)}
                    />
                    <Typography variant="h6"  sx={{ flexGrow: 1,
                        'text-align': 'center'}}>
                        You may need to enable webcam access through your browser. Webcam options vary by browser, and some are
                        more compatible than others.
                    </Typography>

                </Box>
                    </Box>
                : <ValidationResultsComponent validationResults={validationResults}>
                </ValidationResultsComponent>}
        <SHCDialog open={shcDialogOpen}
                   onClose={handleSHCDialogClose}
                   sessionId={sessionId}
                   shcValue={shcString}
                   setValidationResults={setValidationResults}
        ></SHCDialog>


    </Box>
  );
}

export default App;
