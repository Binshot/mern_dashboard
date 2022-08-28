import React from 'react';

const Activities = ({ activity}) => {
    return (
        activity.map(activity => {
            return (
                <tr key={activity.id}>
                    <td>{activity.date} {activity.time}</td>
                    <td>{activity.activity}</td>
                </tr>
            );
        }
        )
    );
};

export default Activities;