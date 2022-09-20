import React, { useState, useEffect } from 'react';
import Activities from './ActivityLogsTableContents';
import PageNumber from './ActivityLogsPageNumber';
import { useActivityLogsContext } from "../../hooks/useActivtyLogsContext"
const Table = () => {

    const { activity, activityDispatch } = useActivityLogsContext()

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetch('https://drims-demo.herokuapp.com/api/activity/')
            const json = await response.json()
            if (response.ok) {
                activityDispatch({ type: 'SET_ACTIVITY', payload: json })
            }
        }

        fetchActivities()
    }, [activityDispatch])

    const [currentPage, setCurrentPage] = useState(1);
    const ActivityPerPage = 5;

    if (activity) {

        // Get current activity
        let indexOfLastActivity = currentPage * ActivityPerPage;
        let indexOfFirstActivity = indexOfLastActivity - ActivityPerPage;
        let currentActivities;
        currentActivities = activity.slice(indexOfFirstActivity, indexOfLastActivity);

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
                                    <h4>Total Activities: {activity.length}</h4>
                                </td>
                                <td>
                                    <PageNumber
                                        activitiesPerPage={ActivityPerPage}
                                        totalActivities={activity.length}
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