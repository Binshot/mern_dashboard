import React, { useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Print from "../NewImageFiles/Topbar/Print.svg"
import TextField from "@mui/material/TextField";
function Header() {
    return (
        <div id='headerBlur' className='header'>
            <div className="flex-row borderBottom2 topHeader">
                <h1>ACTIVITY LOGS</h1>
            </div>
            <div className="flex-row headerActions bottomHeader actions">
                <div style={{ flexGrow: "9" }}>
                    <TextField
                        id="outlined-multiline-static"
                        placeholder="Search for Title, Date or Time"
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
                <div className="rightAlign action">
                    <img src={Print} alt="" className="export" />
                </div>
            </div>
        </div>
    )
}

export default Header
