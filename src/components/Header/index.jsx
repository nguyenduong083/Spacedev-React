import React, { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { avatarDefault } from '../../config'
import { PATH } from '../../config/path'
import { useAuth } from '../AuthContext'

export default function Header() {
  const {user, logout} = useAuth()
  const { pathname } = useLocation ()
  useEffect(()=>{
    onCloseMenu()
  },[pathname])  
  const onToggele = () =>{
     document.body.classList.toggle('menu-is-show')
  }
  const onCloseMenu = () =>{
    document.body.classList.remove('menu-is-show')
  }
  const _logout =(ev) =>{
     ev.preventDefault()
     logout()
  }
  return (
    <>
        <header id="header">
          <div className="wrap">
            <div className="menu-hambeger" onClick={onToggele}>
              <div className="button">
                <span />
                <span />
                <span />
              </div>
              <span className="text">menu</span>
            </div>
            <Link to={PATH.home} className="logo">
              <img src="/img/logo.svg" alt="" />
              <h1>Spacedev</h1>
            </Link>
            <div className="right">
              {
                user ? (
                  <div className="have-login">
                    <div className="account">
                      <Link to={PATH.profile.index}className="info">
                        <div className="name">{user.name}</div>
                        <div className="avatar">
                          <img src={user.avatar ? user.avatar : avatarDefault} alt="" />
                        </div>
                      </Link>
                    </div>
                    <div className="hamberger">
                    </div>
                    <div className="sub">
                      <Link to={PATH.profile.course}>Khóa học của tôi</Link>
                      <Link to={PATH.profile.index}>Thông tin tài khoản</Link>
                      <Link to="#" onClick={(ev)=>{
                          ev.preventDefault()
                          logout()
                      }}>Đăng xuất</Link>
                    </div>
                  </div>
                ) : (
                    <div className="not-login bg-none">
                      <NavLink to={PATH.signin} className="btn-register">Đăng nhập</NavLink>
                      <NavLink to={PATH.signup} className="btn main btn-open-login">Đăng ký</NavLink>
                    </div>
                )
              }
            </div>
          </div>
          <div className="progress" />
        </header>
        <nav className="nav">
            {/* <li>
              <NavLink to={PATH.signin} >Đăng ký / Đăng nhập</NavLink>
            </li> */}
            {
              user ? (
                <ul>
                    <li>
                      <NavLink to={PATH.profile.index} className="account">
                        <div className="avatar">
                          <img src={user.avatar ? user.avatar : avatarDefault} alt="" />
                        </div>
                        <div className="name">{user.name}</div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={PATH.home} >Trang chủ</NavLink>
                    </li>
                    <li>
                      <NavLink to={PATH.team} >Spacedev Team</NavLink>
                    </li>
                    <li>
                      <NavLink to={PATH.course} >Khóa Học</NavLink>
                    </li>
                    <li>
                      <NavLink to={PATH.project} >Dự Án</NavLink>
                    </li>
                    <li>
                      <NavLink to={PATH.contact} >Liên hệ</NavLink>
                    </li>
                </ul>
              ) : (
                <ul>
                    <li>
                      <NavLink to={PATH.home} >Trang chủ</NavLink>
                    </li>
                    <li>
                      <NavLink to={PATH.team} >Spacedev Team</NavLink>
                    </li>
                    <li>
                      <NavLink to={PATH.course} >Khóa Học</NavLink>
                    </li>
                    <li>
                      <NavLink to={PATH.project} >Dự Án</NavLink>
                    </li>
                    <li>
                      <NavLink to={PATH.contact} >Liên hệ</NavLink>
                    </li>
                </ul>
              )
            }
        </nav>
        <div className="overlay_nav" onClick={onCloseMenu}/>
    </>
  )
}
