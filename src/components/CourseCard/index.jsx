import React from 'react'
import { generatePath, Link } from 'react-router-dom'
import { PATH } from '../../config/path'
import Skeleton from '../Skeleton'

export function CourseCard({ thumbnailUrl, title, short_description, slug, id ,teacher}) {
  const path = generatePath(PATH.courseDetail, { slug , id })
  const pathRegister = generatePath(PATH.courseDetail, { slug , id })
  return (
    <div className="col-md-4 course">
        <div className="wrap">
            <Link className="cover" to={path}>
                <img src={thumbnailUrl} alt="" />
            </Link>
            <div className="info">
                <Link className="name" to={path}>
                    {title}
                </Link>
                <p className="des">{short_description}</p>
            </div>
            <div className="bottom">
                <div className="teacher">
                    <div className="avatar">
                        <img src={teacher.avatar}alt="" />
                    </div>
                    <div className="name">{teacher.title}</div>
                </div>
                <Link className="register-btn" to={pathRegister}>Đăng Ký</Link>
            </div>
        </div>
    </div>
  )
}

export const CourseCardLoading =()=>{
    return (
    <div className="col-md-4 course">
        <div className="wrap">
            <Link className="cover" to="#">
                <Skeleton height={310}/>
            </Link>
            <div className="info">
                <Link className="name" to="#">
                    <Skeleton height={30}/>
                </Link>
                <p className="des">
                    <Skeleton height={80}/>
                </p>
            </div>
            <div className="bottom">
                <div className="teacher">
                    <div className="avatar">
                        
                        <Skeleton height={36} width={36} shap="circle"/>
                    </div>
                    <div className="name">
                        <Skeleton height={24} width={150}/>
                    </div>
                </div>
                <a href="/register.html" className="register-btn">
                    <Skeleton height={24} width={50}/>
                </a>
            </div>
        </div>
    </div>
  )
}