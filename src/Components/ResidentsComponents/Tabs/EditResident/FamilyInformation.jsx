import { useParams } from "react-router-dom";
import Select from 'react-select';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function FamilyInformation() {
    const familyMember = [
        { value: 'Husband', label: 'Husband' },
        { value: 'Wife', label: 'Wife' },
        { value: 'Son', label: 'Son' },
        { value: 'Daughter', label: 'Daughter' }
    ];
    const familyHead = [
        { value: 'Belrosatio, Zumac', label: 'Belrosatio, Zumac' },
        { value: 'Abio, Fernando', label: 'Abio, Fernando' },
        { value: 'Aniceto, Dindo', label: 'Aniceto, Dindo' },
        { value: 'Del Rosario, Fernando', label: 'Del Rosario, Fernando' },
        { value: 'Del Rosario, Anakin', label: 'Del Rosario, Anakin' },
        { value: 'Espejo, Luella Josie Basir', label: 'Espejo, Luella Josie Basir' },
    ];

    return (
        <div className="flex-column tab">
            <div className="flex-row space-between">
                <div className="flex-column inputs">
                    <h4>Head of the Family</h4>
                    <FormControl>
                        <RadioGroup
                            name="radio-buttons-group"
                            defaultValue={"No"}
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="flex-column inputs">
                    <h4>Head of the Family</h4>
                    <Select
                        defaultValue={familyHead[0]}
                        options={familyHead}
                    />
                </div>
            </div>
            <div className="flex-row space-between">
                <div className="flex-column inputs">
                    <h4>Family Member</h4>
                    <Select
                        defaultValue={familyMember[1]}
                        options={familyMember}
                    />
                </div>
            </div>
        </div>
    );
}

export default FamilyInformation;
