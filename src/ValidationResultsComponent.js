import PropTypes from 'prop-types';
import {Box, List, Stack, Typography} from "@mui/material";
import ValidationOutcomeSummaryListItem from "./ValidationOutcomeSummaryListItem";
import * as React from "react";
import ValidatedFragmentDialog from "./ValidatedFragmentDialog";
export default function ValidationResultsComponent(props) {
    const { validationResults } = props;

    const [validatedFragment, setValidatedFragment] = React.useState(null);

    return (
        <Box sx={{
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Stack
                sx={{
                    margin: 'auto',
                    width: 1 / 2,
                    height: 1 / 2,

                }}>
            <Typography variant="h5" sx={{
                flexGrow: 1,
                textAlign: 'center',
                paddingTop: 3
            }}>
                Validation Results
            </Typography>
                <Typography variant="subtitle1" sx={{
                    flexGrow: 1,
                    textAlign: 'center',

                }}>
                   Click on a result for issue details.
                </Typography>
        {
                (validationResults && validationResults.outcomes ) &&
                <List> {
                    validationResults.outcomes.map( (outcome) => {
                        return <ValidationOutcomeSummaryListItem index={validationResults.outcomes.indexOf(outcome)} outcome={outcome} onClick={() => setValidatedFragment(outcome)}/>
                    })
                } </List>
        }</Stack>
            <ValidatedFragmentDialog
                open = {validatedFragment != null}
                onClose={ ()=> setValidatedFragment(null)}
                validatedFragment={validatedFragment}
            />
        </Box>
    )
}

ValidationResultsComponent.propTypes = {
    validationResults: PropTypes.any.isRequired
};
