import TextField from "@mui/material/TextField";
import { useState } from "react";
import uploadEventBanner from "../../../NewImageFiles/Event/uploadEventBanner.svg"

function PersonalInformation() {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    return (
        <div className="tab">
            <div style={{ marginBottom: "16px" }}>
                <h4>Description</h4>
                <TextField
                    id="outlined-multiline-static"
                    placeholder="Input Description"
                    multiline
                    rows={5}
                    fullWidth
                    inputProps={{
                        maxLength: 400
                    }}
                />
            </div>
            <div>
                <h4>Events Banner</h4>
                <div className="uploadArticleBanner" style={{ marginBottom: "16px" }}>
                    <label className="fileUpload">
                        <div className="flex-row fileUploadContent">
                            <div className="flex-row">
                                <img src={uploadEventBanner} alt="" />
                                <div className="flex-column">
                                    <h4>Upload an image or drag and drop here</h4>
                                    <p>JPG or PNG, smaller than 10MB</p>
                                </div>
                            </div>

                            <div className="upload">Upload</div>
                        </div>
                        <input type="file" />
                    </label>
                </div>
                <div className="flex-row space-between marginBottom" style={{ marginBottom: "16px" }}>
                    <div>
                        <h4>Start Date</h4>
                        <TextField
                            id="date"
                            type="date"
                            sx={{ width: '300px' }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <h4>End Date</h4>
                        <TextField
                            id="date"
                            type="date"
                            sx={{ width: '300px' }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-row space-between marginBottom" >
                    <div>
                        <h4>Start Time</h4>
                        <TextField
                            id="time"
                            type="time"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ width: 300 }}
                            required
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>
                    <div>
                        <h4>End Time</h4>
                        <TextField
                            id="time"
                            type="time"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ width: 300 }}
                            required
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>

                </div>
            </div>
        </div>

    );
}

export default PersonalInformation;
