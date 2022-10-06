import RightHeader from "./RightHeader"
import Contacts from "./Contacts"
import InputField from "./InputField"
import Conversation from "./Conversation"
import { Autocomplete, TextField } from "@mui/material"
export default function Container() {
    const concernTypes = [
        "All Messages",
        "Community Concern",
        "Events Concern"
    ]
    return (
        <div className="message-container">
            <div className="left">
                <div className="header">
                    <h2 style={{ fontSize: "36px" }}>Messages</h2>
                </div>
                <div style={{ margin: "0 24px" }}>
                    <Autocomplete
                        disablePortal
                        fullWidth
                        id="combo-box-demo"
                        options={concernTypes}
                        defaultValue="All Messages"
                        renderInput={(params) => <TextField {...params}/>}
                        sx={{
                            "& .MuiOutlinedInput-root:hover": {
                                "& > fieldset": {
                                    borderColor: "#7175F4"
                                }
                            }
                        }}
                    />
                </div>

                <Contacts />
            </div>
            <div className="right">
                <RightHeader />
                <Conversation />
                <InputField />
            </div>
        </div>
    );
}