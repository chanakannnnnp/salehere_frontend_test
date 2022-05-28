import React, { useState, useEffect, useRef } from 'react'
import logoImg from '../../assets/images/logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../app/User'
import { useNavigate } from 'react-router-dom'
import { firestore } from '../../firebase'
import * as moment from 'moment'

const chatCollection = firestore.collection('Chatroom')

const Home = () => {
  const { user } = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const paramRoomName = window.location.pathname.replace('/chat/', '')
  const [text, setText] = useState('')
  const [userName] = useState(user?.userData?.userName || '')
  const [roomName] = useState(paramRoomName || user?.userData?.roomName || 'Test')
  const [chatList, setChatList] = useState([])

  const messageEl = useRef(null)

  useEffect(() => {
    if (user?.userData?.userName && paramRoomName) {
      const unsubscribe = chatCollection.doc(roomName)
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .onSnapshot(async (querySnapshot) => {
          var data = querySnapshot?.docs
            ? await Promise.all(
              querySnapshot?.docs?.map(async (doc) => {
                var temp = doc?.data()

                return {
                  ...temp,
                  id: doc?.id,
                  updatedAt: temp?.createdAt?.toDate()
                }
              })
            )
            : []
          if (data?.length) {
            setChatList(data)
          }
        })

      return () => {
        unsubscribe()
      }
    } else gobackHome()
  }, [])

  const scrollToBottom = () => {
    if (messageEl) {
      messageEl?.current?.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
      })
    }
  }

  if (messageEl) scrollToBottom()

  const gobackHome = () => {
    dispatch(logout())
    navigate('/')
  }

  const handleEnterChat = (event) => {
    if (text && event.key === 'Enter') {
      chatFunc()
    }
  }

  const chatFunc = () => {
    const message = { text, user: userName, createdAt: new Date() }
    chatCollection.doc(roomName).collection('messages').add(message)
    setText('')
  }

  return (
    <div className="custom-background-chat p-3">
      <figure className="image logo-chat mb-3">
        <img src={logoImg} alt="Proxumer" />
      </figure>
      <div className="container container-white-chat p-5">
        <div className={'container is-max-desktop'}>
          <p className="title-chat mt-5 has-text-left animate__fadeInUp">ห้อง {roomName}</p>

          {
            chatList?.length > 0 && (<div className="container-gray-chat px-3 pb-3 animate__fadeInRight">
              {
                chatList?.map((el, index) =>
                  el?.user === userName
                    ? (<div key={el?.id} className='container-my-chat mt-3' ref={messageEl}><span className="gray-chat-title">คุณ {el?.user}</span><div className="container-text-and-time"><span className="container-timestamp-chat mr-2">{moment(el?.updatedAt).format('DD/MM/YYYY HH:mm:ss น.')}</span><span className="gray-chat-text mt-1 p-2">{el?.text}</span></div></div>)
                    : (<div key={el?.id} className='container-other-chat mt-3' ref={messageEl}><span className="gray-chat-title">คุณ {el?.user}</span><div className="container-text-and-time"><span className="gray-chat-text ml-3 mt-1 p-2">{el?.text}</span><span className="container-timestamp-chat ml-2">{moment(el?.updatedAt).format('DD/MM/YYYY HH:mm:ss น.')}</span></div></div>)
                )
              }
            </div>)
          }

          <input
            className="input is-medium mt-5 pb-5 animate__fadeInUp"
            type="text"
            placeholder=""
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleEnterChat}>
          </input>
          <p className="has-text-right enter-send-text">Enter เพื่อส่ง</p>
        </div>

        <p onClick={gobackHome} className="red-text-button-chat mt-3 animate__fadeInUp">
          ออกจากแชท
        </p>
      </div>
    </div>
  )
}

export default Home
