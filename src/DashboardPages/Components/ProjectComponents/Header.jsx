import React, { useState } from "react"
import Autocomplete from '@mui/material/Autocomplete';
import Print from "../NewImageFiles/Topbar/Print.svg"
import TextField from "@mui/material/TextField";
function Header() {
    const options = ["Family", "Adults", "Men", "Children", "Teenagers"]
    return (
        <div id='headerBlur' className='header'>
            <div className="flex-row borderBottom2 topHeader">
                <h1>PROJECTS</h1>
            </div>
            <div className="flex-row headerActions bottomHeader actions">
                <div style={{ flexGrow: "9" }}>
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={options}
                        sx={{
                            width: '350px',
                            backgroundColor: "White",
                            "& .MuiOutlinedInput-root:hover": {
                                "& > fieldset": {
                                    borderColor: "#7175F4"
                                }
                            }
                        }}
                        filterSelectedOptions
                        renderInput={(params) => (<TextField {...params} placeholder="Choose Target Beneficiaries" />)}
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
