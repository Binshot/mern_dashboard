import React, { useState } from "react"

import './Chat-Title.css';
import View from "../../../NewImageFiles/ActionButton/View.svg";

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

function ChatTitle(props) {
    const [snackbar, toggleSnackbar] = useState(false);

    const action = (
        <React.Fragment>
            <Button size="small"
                onClick={() => {
                    toggleSnackbar(false)
                }}>
                <p style={{ color: "white", margin: 0 }}>Undo</p>
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    toggleSnackbar(false)
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <div id="chat-title">
            <Snackbar
                open={snackbar}
                onClose={() => { toggleSnackbar(false) }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={2000}
                message="{Resident's name} has been removed!"
                ContentProps={{
                    sx: {
                        background: "#D82727",
                        width: 560,
                        ml: 30,
                        mt: 10
                    }
                }}
                action={action}
            />
            <p>Daryl Duckmanton</p>
            <div className="actions">
                <div className='solidButton squareButton buttonGreen'
                    onClick={() => {
                        props.getModal(true)
                        document.getElementById("sideBlur").className += " blur";
                        document.getElementById("topBlur").className += " blur";
                        document.getElementById("chat-container").className += " blur";
                    }} >
                    <img src={View} alt="" />
                </div>
            </div>

        </div>
    );
}

export default ChatTitle;