import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';
export default function ValidationOutcomeSummaryListItem(props) {
    const {index, outcome, onClick} = props;

    let errorCount= 0;
    let warningCount = 0;
    let infoCount = 0;
    for ( const issue of outcome.issues) {
        if (issue.level === "ERROR") { errorCount++; }
        if (issue.level === "WARNING") { warningCount++; }
        if (issue.level === "INFO") { infoCount++}
    }

    function getIssuesSummary() {
        return `Errors: ${errorCount}, Warnings: ${warningCount}, Info: ${infoCount}`;
    }


    function getSummaryIcon() {
       if (errorCount > 0) {
           return <ReportIcon />
       }
       if (warningCount > 0) {
            return <WarningIcon/>
       }
       return <CheckCircleOutlineIcon/>
    }



    return <ListItem key={index} onClick={onClick}>
        <ListItemButton>
            <ListItemIcon>
                { getSummaryIcon() }
            </ListItemIcon>
            <ListItemText primary={outcome.fileInfo.fileName} secondary={getIssuesSummary()}/>
        </ListItemButton>

    </ListItem>;
}
