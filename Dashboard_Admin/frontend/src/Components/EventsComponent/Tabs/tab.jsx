import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

//Add Resident
import AddEvent from './AddResident/Event';
import AddArticle from './AddResident/Article';

//View Resident
import ViewEvent from './ViewResident/Event';
import ViewArticle from './ViewResident/Article';

// Edit Resident
import EditEvent from './EditResident/Event';
import EditArticle from './EditResident/Article';

export default function LabTabs(props) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log(props.startTime)
    let event, article;
    if (props.action === "add") {
        event = <AddEvent />
        article= <AddArticle/>
    } else if (props.action === "view") {
        event = <ViewEvent startDate={props.startDate} endDate={props.endDate} startTime={props.startTime} endTime={props.endTime}/>
        article= <ViewArticle startDate={props.startDate} endDate={props.endDate} startTime={props.startTime} endTime={props.endTime}/>
    }else{
        event = <EditEvent startDate={props.startDate} endDate={props.endDate} startTime={props.startTime} endTime={props.endTime} />
        article= <EditArticle startDate={props.startDate} endDate={props.endDate} startTime={props.startTime} endTime={props.endTime} />
    }
    return (
        <Box sx={{ width: '100%', height: '270px', mb: 4, borderBottom: 1, borderColor: '#9C9C9C' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: '#9C9C9C' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Events" value="1" />
                        <Tab label="Article" value="2" />
                    </TabList>
                </Box>
                <Box sx={{ maxHeight: "220px", overflow: 'auto' }}>
                    <TabPanel value="1">{event}</TabPanel>
                    <TabPanel value="2">{article}</TabPanel>
                </Box>
            </TabContext>
        </Box>
    );
}
