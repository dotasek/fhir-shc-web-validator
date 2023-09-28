import PropTypes from 'prop-types';
import {Box, List, Typography} from "@mui/material";
import ValidationOutcomeSummaryListItem from "./ValidationOutcomeSummaryListItem";
import * as React from "react";
import ValidatedFragmentDialog from "./ValidatedFragmentDialog";
export default function ValidationResultsComponent(props) {
    const { validationResults } = props;

    const [validatedFragment, setValidatedFragment] = React.useState(false);

    return (
        <Box sx={{
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography variant="h6" sx={{
                flexGrow: 1
            }}>
                Validation Results
            </Typography>
        {
                (validationResults && validationResults.outcomes ) &&
                <List> {
                    validationResults.outcomes.map( (outcome) => {
                        return <ValidationOutcomeSummaryListItem index={validationResults.outcomes.indexOf(outcome)} outcome={outcome} onClick={() => setValidatedFragment(outcome)}/>
                    })
                } </List>
            }
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
