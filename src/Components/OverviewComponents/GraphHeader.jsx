import React from 'react'
import Print from "../NewImageFiles/Topbar/Print.svg"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";

import PDFFile from './PDFFile';
import { PDFDownloadLink } from '@react-pdf/renderer';

function GraphHeader() {
    const tagOption = ['Business', 'Work', 'Legal'];

    return (
        <div>
            <div className='flex-row graphHeader space-between'>
                <h1>Report</h1>
                <PDFDownloadLink document={<PDFFile/>} fileName="form">
                    <button>Download</button>
                </PDFDownloadLink>
                {/* <div className="rightAlign actions" style={{cursor: "pointer"}} >
                    <img src={Print} alt="" className="export" />
                </div> */}
            </div>
            <div className='flex-row' style={{ marginBottom: " 24px" }}>
                <div style={{ width: "30%", marginRight: "24px" }}>
                    <h4 style={{ marginBottom: "8px" }}>Category</h4>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={tagOption}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} placeholder="Choose Category" />}
                    />
                </div>
                <div>
                    <h4 style={{ marginBottom: "8px" }}>From</h4>
                    <TextField
                        id="date"
                        type="date"
                        sx={{ width: '100%' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div style={{ fontWeight: "bolder", padding: "40px 16px 0 " }}>
                    ____
                </div>
                <div>
                    <h4 style={{ marginBottom: "8px" }}>To</h4>
                    <TextField
                        id="date"
                        type="date"
                        sx={{ width: '100%' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
            </div>
        </div>

    )
}

export default GraphHeader
