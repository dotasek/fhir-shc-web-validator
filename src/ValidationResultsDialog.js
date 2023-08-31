import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
export default function ValidationResultsDialog(props) {
    const { onClose, validationResults, open } = props;

    const handleClose = () => {
        onClose(null);
    }


    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Validation Results</DialogTitle>
            { JSON.stringify(validationResults) }
            <Button variant="contained" onClick={handleClose}>Close</Button>
        </Dialog>
    )
}

ValidationResultsDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    validationResults: PropTypes.any.isRequired
};
