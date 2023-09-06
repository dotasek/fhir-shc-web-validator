import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import {
    Checkbox,
    CircularProgress,
    DialogActions,
    DialogContent,
    TextareaAutosize
} from "@mui/material";
import * as React from "react";

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
        fetch('https://validator.fhir.org/validate', requestOptions)
            .then(response => response.json())
            .then(data => {
                setInProgress(false);
                onClose(data);
            });
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Validate SHC QR</DialogTitle>
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

                { inProgress && (
                    <div>
                    <CircularProgress /><br/>
                        Validation in Progress...
                    </div>
                ) }

            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleValidateRequest} disabled={!agreeToSend}>Validate</Button>
            </DialogActions>
        </Dialog>
    )
}

SHCDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    shcValue: PropTypes.string.isRequired,
    sessionId : PropTypes.string.isRequired
};
