import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

//View Resident
import ViewPersonalInformation from './ViewResident/PersonalInformation';
import ViewBackgroundInformation from './ViewResident/BackgroundInformation';
import ViewFamilyInformation from './ViewResident/FamilyInformation';

//View Resident
import EditPersonalInformation from './EditResident/PersonalInformation';
import EditBackgroundInformation from './EditResident/BackgroundInformation';
import EditFamilyInformation from './EditResident/FamilyInformation';

export default function LabTabs(props) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let personal, background, family;
    if (props.action === "view") {
        personal = <ViewPersonalInformation list = {props.list} id={props.id} />
        background= <ViewBackgroundInformation list = {props.list} id={props.id}/>
        family = <ViewFamilyInformation list = {props.list} id={props.id}/>
    }else{
        personal = <EditPersonalInformation list = {props.list} id={props.id}/>
        background= <EditBackgroundInformation list = {props.list} id={props.id} />
        family = <EditFamilyInformation list = {props.list} id={props.id} />
    }
    return (
        <Box sx={{ width: '100%', height: '480px', typography: 'body1', mb: 4, borderBottom: 1, borderColor: '#9C9C9C' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: '#9C9C9C' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Personal Information" value='1' />
                        <Tab label="Background Information" value='2'/>
                        <Tab label="Family Information" value='3' />
                    </TabList>
                </Box>
                <Box sx={{ height: '430px', overflow: 'auto' }}>
                    <TabPanel value='1'>{personal}</TabPanel>
                    <TabPanel value='2'>{background}</TabPanel>
                    <TabPanel value='3'>{family}</TabPanel>
                </Box>
            </TabContext>
        </Box>
    );
}
