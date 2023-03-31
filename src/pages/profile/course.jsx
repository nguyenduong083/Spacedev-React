 import Skeleton from '@/components/Skeleton'
import { PATH } from '@/config/path'
import { useFetch } from '@/hooks/useFetch'
import { courseService } from '@/services/course'
import moment from 'moment'
import React from 'react'
import { generatePath, Link } from 'react-router-dom'
// { data : courses = [] } = []
export default function MyCourse() {
    const { data: courses = [] , loading} = useFetch(courseService.getMyCourse)
    if(loading){
        return Array.from(Array(5)).map((_, i) => <div key={i} className="mb-5"><Skeleton height={250}/></div>) 
    }
    return (
        <div className="tab2">
        {
            courses.length === 0 && <p>Bạn hiện tại không có đăng ký khóa học nào, vui lòng đăng ký khóa học rồi quay trở lại</p>
        }
        {
            courses.map(e => {
            const coursePath = generatePath(PATH.courseDetail, {slug : e.course.slug, id : e.course.id})

            return <div key={e.course.id} className="item">
                <div className="cover">
                    <img src={e.course.thumbnailUrl} alt="" />
                </div>
                <div className="info">
                    <Link to={coursePath} className="name">
                        {e.course.title}
                    </Link>
                    <div className="date">Khai giảng ngày {moment(e.course.opening_time).format('DD/MM/YYYY')}</div>
                    <div className="row">
                        <div >
                            <img src="/img/clock.svg" alt="" className="icon" />{e.total_hours} giờ
                        </div>
                        <div >
                            <img src="/img/play.svg" alt="" className="icon" />{e.video} video
                        </div>
                        <div >
                            <img src="/img/user.svg" alt="" className="icon" />{e.student} học viên
                        </div>
                    </div>
                    <div className="process">
                        <div className="line">
                            <div className="rate" style={{ width: `${e.process}` }} />
                        </div>
                        {e.process}%
                    </div>
                    <Link to={coursePath} className="btn overlay round btn-continue">
                        Tiếp tục học
                    </Link>
                </div>
            </div>
            })
        }
        </div>
    )
}