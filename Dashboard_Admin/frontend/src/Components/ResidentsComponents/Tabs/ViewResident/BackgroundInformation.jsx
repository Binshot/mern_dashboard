import useFetch from "../../../usFetch";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function BackgroundInformation(props) {
    // const { data: resident, error, isPending } = useFetch("http://localhost:8001/Residents/1");

    const resident = props.list[props.id]
    if (resident) {
        return (
            <div className="flex-column tab">
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Civil Status</h4>
                        <input type="text" value="Single" disabled="disabled" />
                    </div>
                    <div className="flex-column inputs">
                        <h4>Educational Attainment</h4>
                        <input type="text" value={resident.educationAttainment} disabled="disabled" />
                    </div>
                </div>
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Occupation</h4>
                        <input type="text" value={resident.occupation} disabled="disable" />
                    </div>
                    <div className="flex-column inputs">
                        <h4>Monthly Income</h4>
                        <input type="text" value={resident.monthlyIncome} disabled="disable" />
                    </div>
                </div>
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Member of  Social Security <br /> System (SSS)</h4>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={resident.govermentMemberships.sss}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled />
                                <FormControlLabel value="No" control={<Radio />} label="No" disabled />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="flex-column inputs">
                        <h4>Member of Government Service <br /> Insurance System (GSIS)</h4>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={resident.govermentMemberships.gsis}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled />
                                <FormControlLabel value="No" control={<Radio />} label="No" disabled />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="flex-row space-between">
                    <div className="flex-column inputs">
                        <h4>Member of Pagtutulungan sa <br /> Kinabukasan (Pag-IBIG)</h4>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={resident.govermentMemberships.pagibig}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled />
                                <FormControlLabel value="No" control={<Radio />} label="No" disabled />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="flex-column inputs">
                        <h4> Member of PhilHealth?</h4>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={resident.govermentMemberships.philHealth}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled />
                                <FormControlLabel value="No" control={<Radio />} label="No" disabled />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </div>
        );
    }
}

export default BackgroundInformation;
