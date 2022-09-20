import React from 'react'
import Event from "../NewImageFiles/Overview/Event.svg"
import Message from "../NewImageFiles/Overview/Message.svg"
import Article from "../NewImageFiles/Overview/Article.svg"
import Edit from "../NewImageFiles/Overview/Edit.svg"


function RecentActivity() {
    return (
        <div className='recentActivity'>
            <h2>Recent Activity</h2>

            <div className='flex-row '>
                <img src={Event} alt="" />
                <div>
                    <p><span>Devon</span> added an event: <span>"Clean Drive...</span></p>
                    <p className='time'>Today at 3:12 PM</p>
                </div>
            </div>
            <div className='spacer'></div>
            <div className='flex-row '>
                <img src={Message} alt="" />
                <div>
                    <p><span>Joshua</span> responded to <span>Maria</span></p>
                    <p className='time'>Today at 1:03 PM</p>
                </div>
            </div>
            <div className='spacer'></div>
            <div className='flex-row '>
                <img src={Article} alt="" />
                <div>
                    <p><span>Helen</span> added an Article: <span>"Basic Negosyo"</span></p>
                    <p className='time'>Today at 12:22 PM</p>
                </div>
            </div>
            <div className='spacer'></div>
            <div className='flex-row '>
                <img src={Edit} alt="" />
                <div>
                    <p><span>Kurt</span> edited <span>June's</span> information</p>
                    <p className='time'>Today at 11:23 AM</p>
                </div>
            </div>
            <div className='spacer'></div>
            <div className='flex-row '>
                <img src={Edit} alt="" />
                <div>
                    <p><span>Kurt</span> edited <span>June's</span> information</p>
                    <p className='time'>Today at 11:23 AM</p>
                </div>
            </div>
            <div className='spacer'></div>
            <div className='flex-row '>
                <img src={Edit} alt="" />
                <div>
                    <p><span>Kurt</span> edited <span>June's</span> information</p>
                    <p className='time'>Today at 11:23 AM</p>
                </div>
            </div>
            <div className='spacer'></div>
            <div className='flex-row '>
                <img src={Edit} alt="" />
                <div>
                    <p><span>Kurt</span> edited <span>June's</span> information</p>
                    <p className='time'>Today at 11:23 AM</p>
                </div>
            </div>
        </div>
    )
}

export default RecentActivity
