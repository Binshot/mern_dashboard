import React, { useState } from 'react';
import ChatSearch from '../search/Chat-Search';
import ConversationList from '../conversation/Conversation-List';
import ChatTitle from '../chat-title/Chat-Title';
import MessageList from '../message/Message-List';
import ChatForm from '../chat-form/Chat-Form';

import './Chat-Shell.css';

import ViewResident from "../chat-title/modal/UpdateResident"

function ChatShell() {
    const [showModal, setShowModal] = useState(false);
    const getModal = modal => setShowModal(modal);

    return (
        <div>
            <ViewResident
                shown={showModal}
                setShown={getModal}
            />
            <div id="chat-container" className='shell'>
                <ChatSearch />
                <ChatTitle
                    getModal={getModal}
                />
                <ConversationList />
                <MessageList />
                <ChatForm />
            </div>
        </div>

    );
}

export default ChatShell;