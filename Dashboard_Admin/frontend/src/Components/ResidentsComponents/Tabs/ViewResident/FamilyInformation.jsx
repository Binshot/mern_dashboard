import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function FamilyInformation() {
    return (
        <div className="flex-column tab">
            <div className="flex-row space-between">
                <div className="flex-column inputs">
                    <h4>head of the Family</h4>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            defaultValue={"No"}
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled />
                            <FormControlLabel value="No" control={<Radio />} label="No" disabled />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="flex-column inputs">
                    <h4>Head of the Family</h4>
                    <input type="text" value={"Belisario, Zumac"} disabled />
                </div>
            </div>
            <div className="flex-row space-between">
                <div className="flex-column inputs">
                    <h4>Family Member</h4>
                    <input type="text" value={"Wife"} disabled />
                </div>
            </div>
        </div>
    );
}

export default FamilyInformation;
