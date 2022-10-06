import View from "../NewImageFiles/Send.svg"
import { TextField } from "@mui/material";

export default function InputField() {
    return (
        <div className="inputfield">
            <TextField
                fullWidth
                sx={{
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                            borderColor: "#7175F4"
                        }
                    }
                }}
            />
            <button style={{ height: "56px", width: "62px", marginLeft: "16px" }} className="solidButton squareButton buttonBlue">
                <img src={View} />
            </button>
        </div>
    );
}