import React from "react"
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Print from "../NewImageFiles/Topbar/Print.svg"
import TextField from "@mui/material/TextField";
import { useActivityLogsContext } from "../../hooks/useActivtyLogsContext"
function Header(props) {
    const { activity } = useActivityLogsContext()

    const requestSearch = (searchedVal) => {
        const filteredRows = activity.filter((row) => {
            return row.activity.toLowerCase().includes(searchedVal.toLowerCase());
        });
        props.get(filteredRows)
    };

    return (
        <div id='headerBlur' className='header'>
            <div className="flex-row borderBottom2 topHeader">
                <h1>ACTIVITY LOGS</h1>
            </div>
            <div className="flex-row headerActions bottomHeader actions">
                <div style={{ flexGrow: "9" }}>
                    <TextField
                        id="outlined-multiline-static"
                        placeholder="Search activity title"
                        sx={{ backgroundColor: "white" }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => requestSearch((e.target.value).toString())}
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
