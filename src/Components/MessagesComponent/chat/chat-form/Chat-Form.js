import React from 'react';

import './Chat-Form.css';
import send from "../../images/icons/send.svg"
function ChatForm() {
    return (
        <div id="chat-form">
            <input type="text" placeholder="Write a message..." />
            <div className='send'>
                <img src={send} alt="" />
            </div>
        </div>
    );
}

export default ChatForm;