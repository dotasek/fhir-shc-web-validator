import PropTypes from 'prop-types';
import {List} from "@mui/material";
import ValidationOutcomeSummaryListItem from "./ValidationOutcomeSummaryListItem";
export default function ValidationResultsComponent(props) {
    const { validationResults } = props;

    return (
        <div>
            {
                (validationResults && validationResults.outcomes ) &&
                <List> {
                    validationResults.outcomes.map( (outcome) => {
                        return <ValidationOutcomeSummaryListItem index={validationResults.outcomes.indexOf(outcome)} outcome={outcome}/>
                    })
                } </List>
            }
        </div>
    )
}

ValidationResultsComponent.propTypes = {
    validationResults: PropTypes.any.isRequired
};
