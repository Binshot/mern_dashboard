import Header from "../ActivityLogsComponents/Header"
import ResidentsTable from "../ActivityLogsComponents/ActivityLogsTable"
import ActivityList from "../dummyDB/Activity";
function ActivityLog() {
    return (
        <div className="content">
            <Header />
            <ResidentsTable list={ActivityList}/>
        </div>
    );
}

export default ActivityLog;