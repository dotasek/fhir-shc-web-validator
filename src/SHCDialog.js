import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import {TextareaAutosize} from "@mui/material";
export default function SHCDialog(props) {
    const { onClose, shcValue, open } = props;

    const handleClose = () => {
        onClose(null);
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
            ]
        }
    }

    const handleCopyRequest = () => {
          navigator.clipboard.writeText(shcValue)
    }

    const handleValidateRequest = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buildRequest(shcValue))
        };
        fetch('http://0.0.0.0:8082/validate', requestOptions)
            .then(response => response.json())
            .then(data => onClose(data.outcomes));
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Validate SHC QR</DialogTitle>
            <TextareaAutosize defaultValue={shcValue}></TextareaAutosize>
        
            <Button variant="outlined" onClick={handleCopyRequest}>Copy SHC</Button>
            <Button variant="outlined" onClick={handleValidateRequest}>Validate</Button>
            <Button variant="contained" onClick={handleClose}>Close</Button>
        </Dialog>
    )
}

SHCDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    shcValue: PropTypes.string.isRequired
};
