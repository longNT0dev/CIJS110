import React from 'react'
import { Link } from 'react-router'

function Login() {
    return (
        <div>
            Chào mừng bạn tới với trang đăng nhập
            <Link to="/">Chuyển hướng tới trang ToDoList</Link>
        </div>
    )
}

export default Login