
import BugReportIcon from '@mui/icons-material/BugReport';
import ArticleIcon from '@mui/icons-material/Article';
import {
    Box, createSvgIcon, Grid, Link, Stack, SvgIcon,
    Typography
} from "@mui/material";

import * as React from "react";
import {useEffect} from "react";
import {config} from "./constants";
import {ReactComponent as GitHubLogo } from "./images/github_white.svg";

export default function Footer(props) {

    const [validatorVersion, setValidatorVersion] = React.useState("unknown");

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`${config.url.API_URL}/validator/version`, )
            .then(response => response.json())
            .then(data => {
                setValidatorVersion( data)
            });
    }, []);

    return (
    <Grid container spacing={2} color="white" backgroundColor="#bbbbbb" sx={{ p: 4, marginTop: 4}}>
        <Grid item xs={4}>
            <Typography variant="h5" sx={{
                flexGrow: 1,
                fontWeight: "bold",
            }}>
                fhir-shc-web-validator
            </Typography>
            <Typography variant="h6" sx={{
                flexGrow: 1,
            }}>
                running validator v{validatorVersion}
            </Typography>
        </Grid>
        <Grid item xs={4} >
            <Link href="#" underline="none" color="inherit">
            <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                <SvgIcon component={GitHubLogo} height={18} />
                <Typography variant="h6" sx={{
                    flexGrow: 1
                }}>
                view project on github
            </Typography>
            </Stack>
        </Link>
            <Link href="#" underline="none" color="inherit">
                <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>

                <BugReportIcon height={18}/>
            <Typography variant="h6" sx={{
                flexGrow: 1,
            }}>
                 log an issue with the team
            </Typography></Stack></Link>
        </Grid>
        <Grid item xs={4}>

        </Grid>
    </Grid>
)
}