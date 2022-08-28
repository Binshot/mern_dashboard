import Select from 'react-select';
import useFetch from "../../../usFetch";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';

function PersonalInformation(props) {
    // const { data: resident, error, isPending } = useFetch("http://localhost:8001/Residents/" + props.id);
    const resident = props.list[props.id]
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

    if (resident) {
        return (
            <div className="flex-column tab">
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Last Name</h4>
                        <input type="text" value={resident.name.lastName}  />
                    </div>
                    <div className="flex-column inputs">
                        <h4>First Name</h4>
                        <input type="text" value={resident.name.firstName}  />
                    </div>
                </div>
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Middle Name</h4>
                        <input type="text" value={resident.name.middleName}  />
                    </div>
                    <div className="flex-column inputs">
                        <h4>Suffix (If Applicable)</h4>
                        <input type="text" value="N/A"  />
                    </div>
                </div>
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Birthday</h4>
                        <TextField
                            id="date"
                            type="date"
                            value={resident.birthday}
                            sx={{ width: 338 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className="flex-column inputs">
                        <h4>Birth Place</h4>
                        <input type="text" value={resident.birthPlace}  />
                    </div>
                </div>
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Gender</h4>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={resident.gender}
                            options={gender}
                            sx={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                    <div className="flex-column inputs">
                        <h4>Religion</h4>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={resident.religion}
                            options={religion}
                            sx={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                </div>
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Email Address</h4>
                        <input type="text" value={resident.email}  />
                    </div>
                    <div className="flex-column inputs">
                        <h4>Contact Number</h4>
                        <input type="text" value={resident.phone}  />
                    </div>
                </div>
                <h4>Address</h4>
                <input type="text" value={resident.address}  />
            </div>
        );
    }
}

export default PersonalInformation;
