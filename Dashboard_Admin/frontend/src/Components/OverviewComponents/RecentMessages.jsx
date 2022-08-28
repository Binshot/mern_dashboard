import React from 'react'
import Message from "../NewImageFiles/Overview/Message.svg"

function RecentMessages() {
    return (
        <div className='recentMessages'>
            <h2>Recent Messages</h2>

            <div className='flex-row '>
                <img src={Message} alt="" />
                <div>
                    <p><span>Marites</span> message you</p>
                    <p className='time'>Today at 3:12 PM</p>
                </div>
            </div>
            <div className='spacer'></div>
            <div className='flex-row '>
                <img src={Message} alt="" />
                <div>
                    <p><span>Jake</span> message you</p>
                    <p className='time'>Today at 1:03 PM</p>
                </div>
            </div>
            <div className='spacer'></div>
            <div className='flex-row '>
                <img src={Message} alt="" />
                <div>
                    <p><span>Maxwell</span> message you</p>
                    <p className='time'>Today at 12:22 PM</p>
                </div>
            </div>
            <div className='spacer'></div>
            <div className='flex-row '>
                <img src={Message} alt="" />
                <div>
                    <p><span>Bernardo</span> message you</p>
                    <p className='time'>Today at 11:23 AM</p>
                </div>
            </div>
            <div className='spacer'></div>
            <div className='flex-row '>
                <img src={Message} alt="" />
                <div>
                    <p><span>Marites</span> message you</p>
                    <p className='time'>Today at 11:23 AM</p>
                </div>
            </div>
            <div className='spacer'></div>
            <div className='flex-row '>
                <img src={Message} alt="" />
                <div>
                    <p><span>Marites</span> message you</p>
                    <p className='time'>Today at 11:23 AM</p>
                </div>
            </div>
            <div className='spacer'></div>
            <div className='flex-row '>
                <img src={Message} alt="" />
                <div>
                    <p><span>Marites</span> message you</p>
                    <p className='time'>Today at 11:23 AM</p>
                </div>
            </div>
        </div>
    )
}

export default RecentMessages
