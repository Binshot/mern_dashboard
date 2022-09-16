import { format } from 'date-fns';
import React from 'react';

const Activities = ({ activity}) => {
    return (
        activity.map(activity => {
            return (
                <tr key={activity._id}>
                    <td>{format(new Date(activity.activityDateTime), 'Pp')}</td>
                    <td>{activity.activity}</td>
                </tr>
            );
        }
        )
    );
};

export default Activities;