import React, { useState, useEffect } from 'react'
import logoImg from '../../assets/images/logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { joinchatroom } from '../../app/User'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { user } = useSelector((state) => state)
  const [userName, setUserName] = useState(user?.userData?.userName || '')
  const [btnClassName, setBtnClassName] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    userName?.length ? setBtnClassName('animate__fadeInUp button-chat mt-5') : setBtnClassName('fadeOutDown display-disappear')
  }, [userName])

  const confirmNameFuc = () => {
    const obj = {
      userName
    }
    userName?.length && dispatch(joinchatroom(obj))
  }

  const createRoomFunc = () => {
    navigate('/create')
  }

  const joinRoomFunc = () => {
    navigate('/join')
  }

  return (
    <div className="custom-background-chat p-3">
      <figure className="image logo-chat mb-3">
        <img src={logoImg} alt="Proxumer" />
      </figure>
      <div className="container container-white-chat p-5">
        <div className={'container is-max-desktop' && (user?.isLogged ? 'fadeOutDown display-disappear' : '')}>
          <p className="title-chat mt-5">ชื่อของคุณ</p>

          <input
            className="input is-medium mt-5"
            type="text"
            placeholder=""
            value={userName}
            onChange={e => setUserName(e.target.value)}>
          </input>

          <button onClick={confirmNameFuc} className={btnClassName}>
            ยืนยัน
          </button>
        </div>

        <div className={'container is-max-desktop' && (!user?.isLogged ? 'fadeOutDown display-disappear' : 'animate__fadeInUp')}>
          <p className="title-chat mt-5">คุณ {user?.userData?.userName || userName}</p>

          <button onClick={createRoomFunc} className="button-chat mt-5">
            สร้างห้องใหม่
          </button>
          <p onClick={joinRoomFunc} className="text-button-chat mt-3">
            เข้าร่วมแชท
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
