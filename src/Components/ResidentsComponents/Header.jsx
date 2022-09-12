import React, { useState } from "react"
import AddResidentTab from "./AddResident"
import InputAdornment from '@mui/material/InputAdornment';
import TextField from "@mui/material/TextField";
import AddIcon from "../NewImageFiles/Resident/addResident.svg"
import SearchIcon from '@mui/icons-material/Search';

import Print from "../NewImageFiles/Topbar/Print.svg"

function Header() {
    
    const [AddmodalShown, toggleAddModal] = useState(false);

    //FOR SNACKBAR
    const [snackbar, toggleSnackbar] = useState(false);
    const [name, setName] = useState([])

    const getShown = get => toggleAddModal(get)
    const getSnack = get => toggleSnackbar(get)
    return (
        <div>
            <AddResidentTab shown={AddmodalShown} setShown={getShown} toggleSnack={getSnack} />

            <div id='headerBlur' className='header'>
                <div className="flex-row borderBottom2 topHeader">
                    <h1>RESIDENTS</h1>
                </div>
                <div className="flex-row headerActions bottomHeader">
                    <div style={{ flexGrow: "9" }}>
                        <TextField
                            id="outlined-multiline-static"
                            placeholder="Search for Name, Position, Email..."
                            sx={{ backgroundColor: "white" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className="flex-row center">
                        <img src={Print} alt="" className="export " style={{ cursor: "pointer" }} />
                        <button className="solidButton add buttonBlue"
                            onClick={() => {
                                toggleAddModal(true)
                                document.getElementById("sideBlur").className += " blur";
                                document.getElementById("topBlur").className += " blur";
                                document.getElementById("headerBlur").className += " blur";
                                document.getElementById("ResidentcontentBlur").className += " blur";
                            }}>
                            <img src={AddIcon} alt="" className="deleteSVG" />
                            <p>Add Head of the Family</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
