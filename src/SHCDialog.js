import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import {
    Box,
    Checkbox,
    CircularProgress,
    DialogActions,
    DialogContent, IconButton, Stack,
    TextareaAutosize, Typography
} from "@mui/material";
import * as React from "react";
import { config } from './constants'
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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
                    <Box flexGrow={1} >QR SHC Value</Box>
                    <Box>
                        <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ textAlign: "center"}}>
                <Stack spacing={2}>
                <TextareaAutosize defaultValue={shcValue} disabled={true} multiline={"true"} maxRows={10}
                                  style={{ width: "100%" }}
                ></TextareaAutosize>

                <Stack direction="row" spacing={2}>

                <Checkbox
                    checked={agreeToSend}
                    onChange={handleAgreementChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    style={{verticalAlign: "top"}}
                />
                    <Typography sx={{textAlign: "left"}}>
                    The data I am sending is non-confidential and for demonstration or testing purposes. I acknowledge that this data may be logged for evaluation purposes.
                    </Typography>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCopyRequest} startIcon={ <ContentCopyIcon/> }>Copy SHC</Button>
                  <Button variant="contained" onClick={handleValidateRequest} disabled={ !agreeToSend || inProgress }
                        startIcon={ inProgress ? <CircularProgress size={24}/> : <PlayArrowIcon/> }
                    >Validate</Button>

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
