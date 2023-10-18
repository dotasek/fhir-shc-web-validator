import {AppBar, IconButton, Toolbar} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "./images/fhir-logo.png";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import * as PropTypes from "prop-types";
import * as React from "react";

export default function Header(props) {
    return <AppBar position="static" color="primary" sx={{
        backgroundColor: "white"
    }}>
        <Toolbar sx={{alignItems: "center"}}>
            {props.validationResults &&
                <IconButton aria-label="back-to-scanner" onClick={props.onClick}>
                    <ArrowBackIcon/>
                </IconButton>
            }
            <img src={logo} alt="HL7 FHIR" height={"48"} style={{padding: 24}}/>;
            <QrCodeScannerIcon color="primary"/>
        </Toolbar>
    </AppBar>;
}

Header.propTypes = {
    validationResults: PropTypes.any,
    onClick: PropTypes.func
};