import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";

export default function ValidationIssueListItem(props) {
    const {index, issue} = props;

    function getIconForIssueLevel(type) {
        switch (type) {
            case "FATAL" : return <ReportIcon></ReportIcon>
            case "ERROR" : return <ErrorIcon></ErrorIcon>
            case "WARNING" : return <WarningIcon></WarningIcon>
            case "INFORMATION" : return <InfoIcon></InfoIcon>
            default: return undefined;
        }

    }
    return <ListItem key={index}>
        <ListItemIcon>
            { getIconForIssueLevel(issue.level)}
        </ListItemIcon>
        <ListItemText>{issue.message}</ListItemText>
    </ListItem>;
}
