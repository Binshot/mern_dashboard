import React, { useState, useRef } from "react"
import AddResidentTab from "./AddResident"
import InputAdornment from '@mui/material/InputAdornment';
import TextField from "@mui/material/TextField";
import AddIcon from "../NewImageFiles/Resident/addResident.svg"
import SearchIcon from '@mui/icons-material/Search';
import Print from "../NewImageFiles/Topbar/Print.svg"
import { useResidentContext } from "../../hooks/userResidentContext"

import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../printPDF/ResidentToPrint';

function Header(props) {

    const [AddmodalShown, toggleAddModal] = useState(false);

    const getShown = get => toggleAddModal(get)

    const { residents } = useResidentContext()

    const requestSearch = (searchedVal) => {
        const filteredRows = residents.filter((row) => {
            let name = row.firstName.toLowerCase() + row.lastName.toLowerCase()
            return name.includes(searchedVal.toLowerCase());
        });
        searchedVal.length() == 0 ? props.get(null) : props.get(filteredRows)
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
        <div>
            <AddResidentTab shown={AddmodalShown} setShown={getShown} />

            <div id='headerBlur' className='header'>
                <div className="flex-row borderBottom2 topHeader">
                    <h1>RESIDENTS</h1>
                </div>
                <div className="flex-row headerActions bottomHeader">
                    <div style={{ flexGrow: "9" }}>
                        <TextField
                            id="outlined-multiline-static"
                            placeholder="Search resident's name"
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
                    <div className="flex-row center">
                        <div className="rightAlign actions" style={{ cursor: "pointer" }} onClick={() => handlePrint()} >
                            <img src={Print} alt="" className="export" />
                        </div>
                        <div style={{ display: "none" }}><ComponentToPrint ref={componentRef} list={residents}/></div>
                        <button className="solidButton add buttonBlue"
                            onClick={() => {
                                toggleAddModal(true)
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
