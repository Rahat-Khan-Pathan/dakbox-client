import React, { useState } from 'react';
import { Alert, Button, Chip, Collapse, Grid, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { apiBaseUrl } from '../config';

// Page state
const initialPageState = {
    homePage: "homepage",
    sendDakPage: "senddakpage",
    getDakPage: "getdakpage"
}
// Initial Message
const initialMessageDoc = {
    message: "",
    messageto: ""
}
const SendDakPage = ({pageState, setPageState}) => {
    // States
    const [messageDoc,setMessageDoc] = useState(initialMessageDoc)
    const [errorMessage,setErrorMessage] = useState("");
    const [openSuccess,setOpenSuccess] = useState(false);
    const [openFailure,setOpenFailure] = useState(false);

    // Helper Functions 
    const clearFields = ()=> {
        setMessageDoc(initialMessageDoc);
    }
    const sendMessage = ()=> {
        if(!messageDoc.messageto) {
            setErrorMessage("Please enter whom you want to send dak");
            setOpenFailure(true);
            return;
        }
        if(!messageDoc.message) {
            setErrorMessage("Please write something as dak");
            setOpenFailure(true);
            return;
        }
        axios({
            method: "POST",
            url: `${apiBaseUrl}/dakbox/new`,
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(messageDoc)
          })
          .then(() => {
            setErrorMessage("Dak sent successfully");
            setOpenSuccess(true);
            clearFields();
        })
        .catch((err) => {
            setErrorMessage(err?.response?.data || "Something went wrong!");
            setOpenFailure(true);
        })
    }
    return (
        <div style={{marginTop:"8rem"}}>
            <div>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <Chip label="Someone is waiting for you..." color="info" size='large' />
                </div>
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
                <Grid spacing={1} container style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Grid item xs={10}>
                        <TextField
                            size='small'
                            fullWidth
                            id="outlined-basic"
                            label="To Whom"
                            multiline
                            value={messageDoc.messageto}
                            onChange={(e)=> {
                                setMessageDoc({...messageDoc,messageto:e.target.value})
                            }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            size='small'
                            fullWidth
                            id="outlined-multiline-flexible"
                            label="Write a Dak"
                            multiline
                            minRows={6}
                            value={messageDoc.message}
                            onChange={(e)=> {
                                setMessageDoc({...messageDoc,message:e.target.value})
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
            <div style={{display:"flex",alignItems:"center",marginTop:"1rem"}}>
                <Grid spacing={1} container style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Grid item xs={12} style={{display:"flex",justifyContent:"center"}}>
                        <Button variant="contained" size='small' color='info' endIcon={<SendIcon/>}
                            onClick={()=> {
                                setOpenFailure(false);
                                setOpenSuccess(false);
                                sendMessage();
                            }}
                        >Send</Button>
                    </Grid>
                    <Grid item xs={12} style={{display:"flex",justifyContent:"center"}}>
                        <Button variant="outlined" color='error' size='small'
                            onClick={()=> {
                                setPageState(initialPageState.homePage)
                            }}
                        >
                        Cancel
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default SendDakPage;