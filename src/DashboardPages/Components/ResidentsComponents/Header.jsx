import React, { useState } from "react"
import AddResidentTab from "./AddResident"
import InputAdornment from '@mui/material/InputAdornment';
import TextField from "@mui/material/TextField";
import AddIcon from "../NewImageFiles/Resident/addResident.svg"
import SearchIcon from '@mui/icons-material/Search';
import Print from "../NewImageFiles/Topbar/Print.svg"
import { useResidentContext } from "../../hooks/userResidentContext"
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
                        <img src={Print} alt="" className="export " style={{ cursor: "pointer" }} />
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
