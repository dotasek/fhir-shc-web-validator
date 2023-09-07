import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import ReportIcon from '@mui/icons-material/Report';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
export default function ValidationResultsDialog(props) {
    const { onClose, validationResults, open } = props;

    const handleClose = () => {
        onClose(null);
    }

    function getIconForIssueLevel(type) {
        switch (type) {
            case "FATAL" : return <ReportIcon></ReportIcon>
            case "ERROR" : return <ErrorIcon></ErrorIcon>
            case "WARNING" : return <WarningIcon></WarningIcon>
            case "INFORMATION" : return <InfoIcon></InfoIcon>
            default: return undefined;
        }

    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Validation Results</DialogTitle>

            {
                (validationResults && validationResults.outcomes ) &&
                <List> {
                validationResults.outcomes[0].issues.map( (issue) => {
                        return <ListItem key={validationResults.outcomes[0].issues.indexOf(issue)}>
                            <ListItemIcon>
                                { getIconForIssueLevel(issue.level)}
                            </ListItemIcon>
                            <ListItemText>{issue.message}</ListItemText>
                        </ListItem>;
                    })
                } </List>
            }

            <Button variant="contained" onClick={handleClose}>Close</Button>
        </Dialog>
    )
}

ValidationResultsDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    validationResults: PropTypes.any.isRequired
};
