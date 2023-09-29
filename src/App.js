
import './App.css';
import {QrScanner} from '@yudiel/react-qr-scanner';

import SHCDialog from './SHCDialog'
import * as React from 'react';
import ValidationResultsComponent from "./ValidationResultsComponent";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import {AppBar, Box, createTheme, IconButton, Stack, ThemeProvider, Toolbar, Typography} from "@mui/material";

function App() {
    const [shcDialogOpen, setShcDialogOpen] = React.useState(false);

    const [shcString, setShcString] = React.useState("");
    const [validationResults, setValidationResults] = React.useState(null)
    const [sessionId, setSessionId] = React.useState(null)
    const handleQRDecode = (value) => {
        setShcString(value);
        setShcDialogOpen(true);
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: "#eb2229"
            }
        }
    });

    const handleSHCDialogClose = (value) => {
        if (value) {
            setSessionId(value.sessionId)
            setValidationResults(value)
        }
        setShcDialogOpen(false);
    };

    const handleBack = () => {
        setValidationResults(null);
    }
  return (
      <ThemeProvider theme={theme}>
      <Box sx={{
          flexGrow: 1
      }}>
          <AppBar position="static" sx={{
              backgroundColor: 'white',
              color: '#eb2229'
          }}>
              <Toolbar>
                  {validationResults &&
                      <IconButton aria-label="back-to-scanner" onClick={handleBack}>
                          <ArrowBackIcon />
                      </IconButton>

                  }
                  <QrCodeScannerIcon sx={{ mr: 2 }}/>
                  <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                      HL7 FHIR : Smart Health Card Validator
                  </Typography>
              </Toolbar>

          </AppBar>
          {
              !validationResults
                  ? <Box sx={{
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}>
                      <Stack
                      sx={{
                          margin: 'auto',
                          width: 1 / 2,
                          height: 1 / 2,

                      }}>
                      <Typography variant="h5" sx={{
                          flexGrow: 1,
                          textAlign: 'center',
                         p: 2
                      }}>
                          Use your webcam to capture your QR code in the box.
                      </Typography>
                      <QrScanner
                          onDecode={(result) =>
                              handleQRDecode(result)
                          }
                          onError={(error) => console.log(error?.message)}
                      />
                      <Typography variant="h6" sx={{
                          flexGrow: 1,
                          textAlign: 'center',
                          p: 2
                      }}>
                          You may need to enable webcam access through your browser. Webcam options vary by browser, and
                          some are more compatible than others.
                      </Typography>
                  </Stack>
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
      </ThemeProvider>
  );
}

export default App;
