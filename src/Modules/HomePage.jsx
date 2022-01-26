import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { FaTelegramPlane } from "react-icons/fa";
// Page state
const initialPageState = {
    homePage: "homepage",
    sendDakPage: "senddakpage",
    getDakPage: "getdakpage"
}

const HomePage = ({pageState, setPageState}) => {
    return (
        <div style={{marginTop:"8rem"}}>
            <div>
                <Grid container>
                    <Grid item xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"8rem"}}>
                        <Typography style={{fontWeight:"bold",fontSize:"3rem"}}> <span style={{color:"#2196f3"}}>Dak</span><span style={{color:"#f44336"}}>Box</span></Typography>
                    </Grid>
                </Grid>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
                <Grid container style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Grid item xs={12} style={{display:"flex",justifyContent:"center",marginBottom:"1rem"}}>
                        <Button variant="contained" size='small' endIcon={<FaTelegramPlane/>}
                            onClick={()=> {
                                setPageState(initialPageState.sendDakPage)
                            }}
                        >Send a Dak</Button>
                    </Grid>
                    <Grid item xs={12} style={{display:"flex",justifyContent:"center"}}>
                        <Button variant="outlined" color='error' size='small'
                            onClick={()=> {
                                setPageState(initialPageState.getDakPage)
                            }}
                        >Get Your Dak</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default HomePage;