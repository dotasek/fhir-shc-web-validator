import {ListItem, ListItemText} from "@mui/material";

export default function ValidationOutcomeSummaryListItem(props) {
    const {index, outcome, onClick} = props;

    function getIssuesSummary() {
        let errorCount= 0;
        let warningCount = 0;
        let infoCount = 0;
        for ( const issue of outcome.issues) {
            if (issue.level === "ERROR") { errorCount++; }
            if (issue.level === "WARNING") { warningCount++; }
            if (issue.level === "INFO") { infoCount++}
        }
        return `Errors: ${errorCount}, Warnings: ${warningCount}, Info: ${infoCount}`;
    }

    return <ListItem key={index} onClick={onClick}>
        <ListItemText primary={outcome.fileInfo.fileName} secondary={getIssuesSummary()}/>
    </ListItem>;
}
