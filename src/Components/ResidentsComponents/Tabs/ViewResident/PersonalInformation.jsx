import useFetch from "../../../usFetch";
import TextField from "@mui/material/TextField";

function PersonalInformation(props) {

    // const { data: resident, error, isPending } = useFetch("http://localhost:8001/Residents/1");

    const resident = props.list[props.id]
    if (resident) {
        return (
            <div className="flex-column tab">
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Last Name</h4>
                        <input type="text" value={resident.name.lastName} disabled="disabled" />
                    </div>
                    <div className="flex-column inputs">
                        <h4>First Name</h4>
                        <input type="text" value={resident.name.firstName} disabled="disabled" />
                    </div>
                </div>
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Middle Name</h4>
                        <input type="text" value={resident.name.middleName} disabled="disabled" />
                    </div>
                    <div className="flex-column inputs">
                        <h4>Suffix (If Applicable)</h4>
                        <input type="text" value="N/A" disabled="disabled" />
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
                            disabled={true}
                        />
                    </div>
                    <div className="flex-column inputs">
                        <h4>Birth Place</h4>
                        <input type="text" value={resident.birthPlace} disabled="disabled" />
                    </div>
                </div>
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Gender</h4>
                        <input type="text" value={resident.gender} disabled="disabled" />
                    </div>
                    <div className="flex-column inputs">
                        <h4>Religion</h4>
                        <input type="text" value={resident.religion} disabled="disabled" />
                    </div>
                </div>
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Email Address</h4>
                        <input type="text" value={resident.email} disabled="disabled" />
                    </div>
                    <div className="flex-column inputs">
                        <h4>Contact Number</h4>
                        <input type="text" value={resident.phone} disabled="disabled" />
                    </div>
                </div>
                <h4>Address</h4>
                <input type="text" value={resident.address} disabled="disabled" />
            </div>
        );
    }

}

export default PersonalInformation;
