import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    DialogContent, Grid, IconButton, List, Typography
} from "@mui/material";
import * as React from "react";
import ValidationIssueListItem from "./ValidationIssueListItem";

import 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

import AceEditor from "react-ace";
import {useRef} from "react";

export default function ValidatedFragmentDialog(props) {
    const { onClose, validatedFragment, open } = props;

    const handleClose = () => {
        onClose(null);
    }

    const onIssueClick = (issue) => {
        let cursor = editorRef.current.editor.selection.getCursor();
        cursor.row = issue.line;
        cursor.column = issue.col;
        editorRef.current.editor.focus();
        editorRef.current.editor.gotoLine(cursor.row,cursor.column, true);
        editorRef.current.editor.renderer.scrollToRow(cursor.row);
    }

    const editorRef = useRef(null);

    return (
        <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={80}>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1} >
                       <Typography variant="h5" >Validated Fragment</Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                    </Box>
                </Box>
            </DialogTitle>
            { validatedFragment &&
            <DialogContent >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" sx={{
                            paddingBottom: 1
                        }}>
                            Content
                        </Typography>
                        <AceEditor
                            mode="json"
                            theme="github"
                            ref={editorRef}
                            style={{ width:'100%' }}

                            fontSize={16}
                            showPrintMargin={false}
                            wrapEnabled={true}
                            showGutter={true}

                            value={validatedFragment.fileInfo.fileContent}

                            setOptions={{
                                useWorker: false,
                                showLineNumbers: true,
                                readOnly: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography variant="h6" sx={{
                                paddingBottom: 1
                            }}>
                                Issues
                            </Typography>
                            <List> {
                                validatedFragment.issues.map( (issue) => {
                                    return <ValidationIssueListItem index={validatedFragment.issues.indexOf(issue)} issue={issue} onClick={ () => onIssueClick(issue)}/>
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
