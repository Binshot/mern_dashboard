import React from 'react';
import format from 'date-fns/format'
import Tooltip from '@mui/material/Tooltip';
import View from "../NewImageFiles/ActionButton/View.svg"
import Update from "../NewImageFiles/ActionButton/Update.svg"
import Delete from "../NewImageFiles/ActionButton/Delete.svg"

const announcement = ({ announcement, id, flag, action, title, description, del }) => {
    return (
        announcement.map(announcement => {
            return (
                <tr key={announcement._id}>
                    <td>{announcement.announcementTitle} </td>
                    <td>{format(new Date(announcement.announcementDateTime), 'MMM dd, yyyy')}</td>
                    <td>{format(new Date(announcement.announcementDateTime), 'hh:mm aa')} </td>
                    <td className='residentActions actions'>
                        <div className='flex-row'>
                            <Tooltip title="View" arrow>
                                <button style={{ marginRight: "16px" }} className="solidButton squareButton buttonGreen"
                                    onClick={() => {
                                        id(announcement._id)
                                        flag(true)
                                        action("view")
                                        title(announcement.announcementTitle)
                                        description(announcement.announcementDetail)
                                    }}>
                                    <img src={View} alt="" />
                                </button>
                            </Tooltip>
                            <Tooltip title="Update" arrow>
                                <button style={{ marginRight: "16px" }} className="solidButton squareButton buttonBlue"
                                    onClick={() => {
                                        id(announcement._id)
                                        flag(true)
                                        action("edit")
                                        title(announcement.announcementTitle)
                                        description(announcement.announcementDetail)
                                    }} >
                                    <img src={Update} alt="" />
                                </button>
                            </Tooltip>
                            <Tooltip title="Delete" arrow>
                                <button className='delete squareButton'
                                    onClick={() => {
                                        id(announcement._id)
                                        title(announcement.announcementTitle)
                                        del(true)
                                        action("delete")
                                    }} >
                                    <img src={Delete} alt="" />
                                </button>
                            </Tooltip>
                        </div>
                    </td>
                </tr>
            );
        }
        )
    );
};

export default announcement;