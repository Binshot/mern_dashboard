import React, { useRef } from 'react';
import Print from "../NewImageFiles/Topbar/Print.svg"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";

import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';

function GraphHeader() {
    const tagOption = ['Business', 'Work', 'Legal'];

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <div className='flex-row graphHeader space-between'>
                <h1>Report</h1>
                {/* <PDFDownloadLink document={<PDFFile />} fileName="form">
                    <div className="rightAlign actions" style={{ cursor: "pointer" }} >
                        <img src={Print} alt="" className="export" />
                    </div>
                </PDFDownloadLink> */}

                <div className="rightAlign actions" style={{ cursor: "pointer" }} onClick={() => handlePrint()} >
                    <img src={Print} alt="" className="export" />
                </div>

                <div style={{ display: "none" }}><ComponentToPrint ref={componentRef} /></div>

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
