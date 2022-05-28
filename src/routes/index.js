import * as React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../views/ChatRoom'
import CreateChatRoom from '../views/ChatRoom/chatroom.create'
import JoinChatRoom from '../views/ChatRoom/chatroom.join'
import ChatRoom from '../views/ChatRoom/chatroom'

export default () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<CreateChatRoom />} />
        <Route path="join" element={<JoinChatRoom />} />
        <Route path="chat/:roomName" element={<ChatRoom />} />
    </Routes>
)
