import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from "react";
import { useForm } from "react-hook-form";

function PersonalInformation() {
    const gender = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' }
    ];
    const religion = [
        { value: 'Catholic', label: 'Catholic' },
        { value: 'Cristian', label: 'Cristian' },
        { value: 'Muslim', label: 'Muslim' },
        { value: 'Other', label: 'Other' }
    ];

    const [value, setValue] = useState('')
    const { register, control, formState } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        shouldUnregister: false
        // defaultValues
    });
    return (
        <form>
            <div className="flex-column tab">
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Last Name</h4>
                        <input type="text" placeholder="Input last Name" inputRef={register()} />
                        {/* // value={value} onChange={(e) => {
                        //     console.log(e.target.value)
                        //     setValue(e.target.value)
                        // }} /> */}
                    </div>
                    <div className="flex-column inputs">
                        <h4>First Name</h4>
                        <input type="text" placeholder="Input First Name" />
                    </div>
                </div>
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Middle Name</h4>
                        <input type="text" placeholder="Input Middle Name" />
                    </div>
                    <div className="flex-column inputs">
                        <h4>Suffix (If Applicable)</h4>
                        <input type="text" placeholder="Input Suffix" />
                    </div>
                </div>
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Birthday</h4>
                        <TextField
                            id="date"
                            type="date"
                            placeholder="Choose Birthday"
                            sx={{ width: 338 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className="flex-column inputs">
                        <h4>Birth Place</h4>
                        <input type="text" placeholder="Input Birth Place" />
                    </div>
                </div>
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Gender</h4>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={gender}
                            sx={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} placeholder="Choose Gender" />}
                        />
                    </div>
                    <div className="flex-column inputs">
                        <h4>Religion</h4>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={religion}
                            sx={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} placeholder="Choose Religion" />}
                        />
                    </div>
                </div>
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Email Address</h4>
                        <input type="text" placeholder="Input Email" />
                    </div>
                    <div className="flex-column inputs">
                        <h4>Contact Number</h4>
                        <input type="text" placeholder="Input Contact Number" />
                    </div>
                </div>
                <h4>Address</h4>
                <input type="text" placeholder="Input Address" />
            </div>
        </form>

    );
}

export default PersonalInformation;
