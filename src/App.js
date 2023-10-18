
import './App.css';
import {QrScanner} from '@yudiel/react-qr-scanner';

import SHCDialog from './SHCDialog'
import * as React from 'react';
import ValidationResultsComponent from "./ValidationResultsComponent";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import {AppBar, Box, createTheme, IconButton, Stack, ThemeProvider, Toolbar, Typography} from "@mui/material";
import logo from './images/fhir-logo.png';
import Footer from "./Footer";
import * as PropTypes from "prop-types";
import Header from "./Header";



function App() {
    const [shcDialogOpen, setShcDialogOpen] = React.useState(false);

    const [shcString, setShcString] = React.useState("");
    const [validationResults, setValidationResults] = React.useState(null)
    const [sessionId, setSessionId] = React.useState(null)
    const handleQRDecode = (value) => {
        setShcString(value);
        setShcDialogOpen(true);
    }

    const HL7_RED = "#eb2229";

    const theme = createTheme({
        palette: {
            primary: {
                main: HL7_RED
            },
            footer: {
                main: "#bbbbbb"
            }
        },
        typography: {
            h4 : {
                color: HL7_RED
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
              <Header validationResults={validationResults} onClick={handleBack}/>
              {
                  !validationResults
                      ? <Box sx={{
                          paddingTop: 4,
                          alignItems: 'center',
                          justifyContent: 'center'
                      }}>
                          <Stack
                              sx={{
                                  margin: 'auto',
                                  width: 1 / 2,
                                  height: 1 / 2,

                              }}>
                              <Typography variant="h4" sx={{
                                  flexGrow: 1,
                                  textAlign: 'center',
                                  paddingTop: 2
                              }}>
                                  Validate Smart Health Card
                              </Typography>
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
                                  You may need to enable webcam access through your browser. Webcam options vary by browser,
                                  and
                                  some are more compatible than others.
                              </Typography>
                          </Stack>
                      </Box>
                      : <ValidationResultsComponent validationResults={validationResults}>
                      </ValidationResultsComponent>}
              <Footer/>
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
