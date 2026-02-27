import { useState } from 'react'
import './App.css'
import CardContainer from './components/CardContainer/CardContainer'
import Demo from './components/Demo/Demo'

function A({ isLogin }) {


  return (
    <>Trạng thái người dùng là {isLogin}</>
  )
}

function B({ userName }) { //props: Object
  return (
    <>Người dùng đang đăng nhập là {userName}</>
  )
}


function App() {
  const [user, setUser] = useState({
    name: 'John Doe',
    isLogin: true,
    avatar: 'https://i.pravatar.cc/150?img=3'
  })

  return (
    <>
      <A isLogin={user.isLogin} />
      <B userName={user.name} />





      {/* <CardContainer /> */}
      {/* 
      <Demo></Demo> */}

      {/* Ví dụ về truyền dữ liệu từ cha xuống con */}

    </>
  )
}

export default App

