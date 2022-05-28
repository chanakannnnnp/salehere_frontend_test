import React, { useState, useEffect } from 'react'
import logoImg from '../../assets/images/logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateuser } from '../../app/User'

const Home = () => {
  const { user } = useSelector((state) => state)
  const [roomName, setRoomName] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.isLogged) gobackHome()
  }, [user])

  const gobackHome = () => {
    const obj = {
      userName: user?.userData?.userName,
      roomName: ''
    }
    dispatch(updateuser(obj))
    navigate('/')
  }

  const goChatFunc = () => {
    const obj = {
      userName: user?.userData?.userName,
      roomName
    }
    if (roomName?.length) {
      dispatch(updateuser(obj))
      navigate(`/chat/${roomName || 'test'}`)
    }
  }

  return (
    <div className="custom-background-chat p-3">
      <figure className="image logo-chat mb-3">
        <img src={logoImg} alt="Proxumer" />
      </figure>
      <div className="container container-white-chat p-5">
        <div className={'container is-max-desktop' && (!user?.isLogged ? 'fadeOutDown display-disappear' : 'animate__fadeInUp')}>
          <p className="title-chat mt-5">สร้างห้องใหม่</p>

          <input
            className="input is-medium mt-5"
            type="text"
            placeholder=""
            value={roomName}
            onChange={e => setRoomName(e.target.value)}>
          </input>

          <span onClick={gobackHome} className="text-button-chat mt-3">
            กลับ
          </span>
          <button onClick={goChatFunc} className="button-chat mt-3 ml-5">
            ยืนยัน
          </button>
        </div>

      </div>
    </div>
  )
}

export default Home
