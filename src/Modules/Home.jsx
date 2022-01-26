import { Button, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FaTelegramPlane } from "react-icons/fa";
import GetDakPage from './GetDakPage';
import HomePage from './HomePage';
import SendDakPage from './SendDakPage';
// Page state
const initialPageState = {
    homePage: "homepage",
    sendDakPage: "senddakpage",
    getDakPage: "getdakpage"
}
const Home = () => {
    // States 
    const [pageState,setPageState] = useState(initialPageState.homePage);
    console.log(pageState);
    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",backgroundColor:"#42a5f5"}}>
            <Paper elevation={10} style={{minHeight:"80vh",minWidth:"30vw",maxWidth:"30vw",borderRadius:"1rem"}}>
                <div>
                    {
                        pageState === initialPageState.homePage ? <HomePage pageState={pageState} setPageState={setPageState}></HomePage> : pageState === initialPageState.sendDakPage ? <SendDakPage pageState={pageState} setPageState={setPageState}></SendDakPage> : <GetDakPage pageState={pageState} setPageState={setPageState}></GetDakPage>
                    }
                </div>
            </Paper>
        </div>
    );
};

export default Home;