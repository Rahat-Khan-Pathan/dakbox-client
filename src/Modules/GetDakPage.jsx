import { Alert, Collapse, Grid, IconButton, TextField, Button, Typography, Paper, Chip } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from '../config';
import CloseIcon from '@mui/icons-material/Close';
import { IoIosSearch } from "react-icons/io";
import ShowMoreText from "react-show-more-text";

// Page state
const initialPageState = {
    homePage: "homepage",
    sendDakPage: "senddakpage",
    getDakPage: "getdakpage"
}
// Initial Search Query
const initialSearchQuery = {
    name:"",
    nameisused:false
}
const GetDakPage = ({pageState, setPageState}) => {
    // States
    const [allDaks,setAllDaks] = useState([]);
    const [searchQuery,setSearchQuery] = useState(initialSearchQuery);
    const [search,setSearch] = useState(true);
    const [errorMessage,setErrorMessage] = useState("");
    const [openSuccess,setOpenSuccess] = useState(false);
    const [openFailure,setOpenFailure] = useState(false);
console.log(allDaks);
    // Helper Functions
    const getAllDaks = ()=> {
        axios({
            method: "POST",
            url: `${apiBaseUrl}/dakbox/get_all`,
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(searchQuery)
          })
          .then((res) => {
            res.data.results?  setAllDaks(res.data.results) : setAllDaks([]);
        })
        .catch((err) => {
            setErrorMessage(err?.response?.data || "Something went wrong!");
            setOpenFailure(true);
        })
    }

    // Use effects
    useEffect(()=> {
        getAllDaks();
    },[search])
    return (
        <div>
            <div style={{ marginTop: "1rem",marginBottom:"1rem"}}>
                <Collapse in={openSuccess}>
                    <Alert
                        action={
                        <IconButton aria-label="close" color="inherit" onClick={() => {setOpenSuccess(false)}}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                        }
                    >{errorMessage}
                    </Alert>
                </Collapse>
                <Collapse in={openFailure}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton aria-label="close" color="inherit" onClick={() => { setOpenFailure(false)}}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    > {errorMessage}
                    </Alert>
                </Collapse>
            </div>
            <Grid container style={{display:"flex",justifyContent:"center",alignItems:"center",paddingBottom:"1rem"}}>
                <Grid item xs={6}>
                    <TextField
                        size='small'
                        fullWidth
                        id="outlined-basic"
                        label="Search by your name"
                        value={searchQuery.name}
                        onChange={(e)=> {
                            setSearchQuery({...searchQuery,name:e.target.value,nameisused:Boolean(e.target.value)});
                            setSearch(!search);
                        }}
                    />
                </Grid>
                <Grid item xs={2} style={{marginLeft:"1rem"}}> 
                    <Button variant="contained" size='large' color='info'
                        onClick={()=> {
                            setSearch(!search);
                        }}
                    >
                        <IoIosSearch></IoIosSearch>
                    </Button>
                </Grid>
                <Grid item xs={1} >
                    <Button variant="outlined" color='error' size='large'
                        onClick={()=> {
                            setPageState(initialPageState.homePage)
                        }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </Button>
                </Grid>
            </Grid>
            <div style={{overflowY:"scroll",maxHeight:"65vh"}}>
                <Grid container style={{display:"flex",justifyContent:"center"}}>
                    {
                        allDaks.map(dak => (
                            <Grid key={dak._id} item xs={11} component={Paper} elevation={2} style={{marginTop:"1rem",borderRadius:"0.5rem",padding:"1rem",backgroundColor:"#eeeeee"}}>
                                <Chip label={dak.messageto} color="info" size='small' />

                                <Chip label={new Date(dak.datetime).toLocaleDateString()} color="error" size='small' style={{marginLeft:".5rem"}} />

                                <Chip label={new Date(dak.datetime).toLocaleTimeString()} color="error" size='small' style={{marginLeft:".5rem"}} />

                                <div style={{marginTop:"1rem",overflowWrap:"break-word"}}>
                                    <ShowMoreText
                                        /* Default options */
                                        lines={10}
                                        more="Show more"
                                        less="Show less"
                                        className="content-css"
                                        anchorClass="my-anchor-css-class"
                                        expanded={false}
                                        width={320}
                                        truncatedEndingComponent={"... "}
                                    >
                                        {dak.message}
                                    </ShowMoreText>
                                </div>

                            </Grid>
                        ))
                    }
                </Grid>
            </div>
            
        </div>
    );
};

export default GetDakPage;