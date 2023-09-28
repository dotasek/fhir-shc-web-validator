import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import {
    Box,
    Checkbox,
    CircularProgress,
    DialogActions,
    DialogContent, IconButton,
    TextareaAutosize
} from "@mui/material";
import * as React from "react";
import { config } from './constants'
import CloseIcon from "@mui/icons-material/Close";

export default function SHCDialog(props) {
    const { onClose, shcValue, open, sessionId } = props;

    const [inProgress, setInProgress] = React.useState(false);
    const [agreeToSend, setAgreeToSend] = React.useState(false);

    const handleClose = () => {
        onClose(null);
    }

    const handleAgreementChange = () => {
        setAgreeToSend(!agreeToSend)
    }

    const buildRequest = (shcValue) => {
        return {
            "cliContext": {
                "sv": "4.0.1",
                "locale": "en"
            },
            "filesToValidate": [
                {
                    "fileName": "manually_entered_file.shc",
                    "fileContent": shcValue,
                    "fileType": "shc"
                }
            ],
            "sessionId": sessionId
        }
    }

    const handleCopyRequest = () => {
          navigator.clipboard.writeText(shcValue)
    }

    const handleValidateRequest = () => {
        if (!agreeToSend) {
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buildRequest(shcValue))
        };
        setInProgress(true);
        fetch(`${config.url.API_URL}/validate`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setInProgress(false);
                onClose(data);
            });
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1} >Validated SHC QR</Box>
                    <Box>
                        <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ textAlign: "center"}}>
                <p><TextareaAutosize defaultValue={shcValue} disabled={true} multiline={"true"} maxRows={10} ></TextareaAutosize>
                </p>
                <p>
                <Button variant="outlined" onClick={handleCopyRequest}>Copy SHC</Button>
                </p>
                <div>
                <Checkbox
                    checked={agreeToSend}
                    onChange={handleAgreementChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                    The data I am sending is non-confidential and for demonstration or testing purposes. I acknowledge that this data may be logged for evaluation purposes.
                </div>

            </DialogContent>
            <DialogActions>
                { inProgress
                    ? <Box>Validating...<CircularProgress /></Box>
                :   <Button variant="contained" onClick={handleValidateRequest} disabled={ !agreeToSend || inProgress }>Validate</Button>
                }
            </DialogActions>
        </Dialog>
    )
}

SHCDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    shcValue: PropTypes.string.isRequired,
    sessionId : PropTypes.string
};
