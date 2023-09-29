import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import BugReportIcon from "@mui/icons-material/BugReport";

export default function ValidationIssueListItem(props) {
    const {index, issue, onClick} = props;

    function getIconForIssueLevel(type) {
        switch (type) {
            case "FATAL" : return <BugReportIcon color={"error"}/>
            case "ERROR" : return <ReportIcon color={"error"}/>
            case "WARNING" : return <WarningIcon color={"warning"}/>
            case "INFORMATION" : return <InfoIcon color={"info"}/>
            default: return undefined;
        }

    }
    return <ListItem key={index} onClick={onClick}>
        <ListItemButton>
        <ListItemIcon>
            { getIconForIssueLevel(issue.level)}
        </ListItemIcon>
        <ListItemText>{issue.message}</ListItemText>
        </ListItemButton>
    </ListItem>;
}
