import React, {useRef} from "react"
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Print from "../NewImageFiles/Topbar/Print.svg"
import TextField from "@mui/material/TextField";
import { useActivityLogsContext } from "../../hooks/useActivtyLogsContext"

import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../printPDF/ActivityLogsToPrint';

function Header(props) {
    const { activity } = useActivityLogsContext()

    const requestSearch = (searchedVal) => {
        const filteredRows = activity.filter((row) => {
            return row.activity.toLowerCase().includes(searchedVal.toLowerCase());
        });
        props.get(filteredRows)
    };

    const pageStyle = `
                        @page {
                            size: landscape;
                            margin: 10mm 10mm 10mm 10mm
                        }                        
                    `;

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: pageStyle,
    });


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
                        sx={{
                            backgroundColor: "white",
                            "& .MuiOutlinedInput-root:hover": {
                                "& > fieldset": {
                                    borderColor: "#7175F4"
                                }
                            }
                        }}
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
                <div className="rightAlign actions" style={{ cursor: "pointer" }} onClick={() => handlePrint()} >
                    <img src={Print} alt="" className="export" />
                </div>
                <div style={{ display: "none" }}><ComponentToPrint ref={componentRef} list={activity} /></div>
            </div>
        </div>
    )
}

export default Header
