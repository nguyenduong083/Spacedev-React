import React, { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'
import { avatarDefault } from '../config'
import { PATH } from '../config/path'

export default function ProfileLayout() {
    const {user} = useAuth()
    return (
        <main className="profile" id="main">
            <section>
                <div className="top-info">
                    <div className="avatar">
                        <img src={user.avatar ? user.avatar : avatarDefault} alt="" />
                        <div className="camera" />
                    </div>
                    <div className="name">{user.name}</div>
                    <p className="des">Thành viên của team Spacedev1-OFFLINE</p>
                </div>
                <div className="container">
                    <div className="tab">
                        <div className="tab-title">
                            <NavLink end to={PATH.profile.index}>Thông tin tài khoản</NavLink>
                            <NavLink to={PATH.profile.course}>Khóa học của bạn</NavLink>
                            <NavLink to={PATH.profile.project}>Dự án đã làm</NavLink>
                            <NavLink to={PATH.profile.payment}>Lịch sử thanh toán</NavLink>
                            <NavLink to={PATH.profile.coin}>Quản lý COIN của tôi</NavLink>
                        </div>
                        <div className="tab-content">
                            <Suspense fallback={ <div>Loading Profile...</div> }>
                                <Outlet />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}