import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,

    DialogActions,
    DialogContent, Grid, IconButton, List,
    TextareaAutosize
} from "@mui/material";
import * as React from "react";
import ValidationIssueListItem from "./ValidationIssueListItem";


export default function ValidatedFragmentDialog(props) {
    const { onClose, validatedFragment, open } = props;

    const handleClose = () => {
        onClose(null);
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={80}>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1} >Validated Fragment </Box>
                <Box><IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton></Box></Box>
            </DialogTitle>
            { validatedFragment &&
            <DialogContent sx={{ textAlign: "center"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>

                            <TextareaAutosize defaultValue={validatedFragment.fileInfo.fileContent} disabled={true} multiline={"true"} maxRows={10} ></TextareaAutosize>

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <List> {
                                validatedFragment.issues.map( (issue) => {
                                    return <ValidationIssueListItem index={validatedFragment.issues.indexOf(issue)} issue={issue}/>
                                })
                            } </List>
                        </Box>
                    </Grid>
                </Grid>

            </DialogContent> }

        </Dialog>
    )
}

ValidatedFragmentDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    validatedFragment: PropTypes.any.isRequired,
};
