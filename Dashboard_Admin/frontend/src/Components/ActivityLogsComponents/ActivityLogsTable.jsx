import React, { useState } from 'react';
import Activities from './ActivityLogsTableContents';
import PageNumber from './ActivityLogsPageNumber';
import useFetch from "../usFetch";

const Table = (props) => {
    // const { data: ActivityList, error, isPending } = useFetch("http://localhost:8004/Logs");
    const ActivityList = props.list

    const [currentPage, setCurrentPage] = useState(1);
    const ActivityPerPage = 5;

    if (ActivityList) {

        const activities = ActivityList

        // Get current activities
        let indexOfLastActivity = currentPage * ActivityPerPage;
        let indexOfFirstActivity = indexOfLastActivity - ActivityPerPage;
        let currentActivities;
        currentActivities = activities.slice(indexOfFirstActivity, indexOfLastActivity);

        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);

        return (
            <div>
                <div id='ResidentcontentBlur' className='resident'>
                    {/* {isPending && <div>Loading...</div>}
                    {error && <div>{error}</div>} */}
                    <table className='ActivityLogs_table'>
                        <thead>
                            <tr>
                                <td><h4>DATE AND TIME</h4> </td>
                                <td><h4>ACTIVITY</h4></td>
                            </tr>
                        </thead>
                        <tbody>
                            <Activities
                                activity={currentActivities}
                            />
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <h4>Total Activities: {activities.length}</h4>
                                </td>
                                <td>
                                    <PageNumber
                                        activitiesPerPage={ActivityPerPage}
                                        totalActivities={activities.length}
                                        paginate={paginate}
                                    />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }
};

export default Table;