import React from 'react'
import Print from "../NewImageFiles/Topbar/Print.svg"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";

import axios from 'axios';
import { saveAs } from 'file-saver';

function GraphHeader() {
    const tagOption = ['Business', 'Work', 'Legal'];

    const val = {
        name: '',
        receiptId: 0,
        price1: 0,
        price2: 0,
    }

    const createAndDownloadPdf = () => {
        axios.post('http://localhost:4000/create-pdf', val)
            .then(() => axios.get('http://localhost:4000/fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                saveAs(pdfBlob, 'newPdf.pdf');
            })
    }


    return (
        <div>
            <div className='flex-row graphHeader space-between'>
                <h1>Report</h1>
                <div className="rightAlign actions" style={{cursor: "pointer"}} onClick={() => createAndDownloadPdf()}>
                    <img src={Print} alt="" className="export" />
                </div>
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
