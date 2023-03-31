import { useQuery } from '@/hooks/useQuery'
import React from 'react'
import { CourseCard, CourseCardLoading } from '../../components/CourseCard'
import { useFetch } from '../../hooks/useFetch'
import { courseService } from '../../services/course'

export default function Course() {
    // const {data: courses = [] , loading } = useFetch(()=>courseService.getCourse())
    const { data : { data : courses = [] } = {} , loading } = useQuery({
        queryFn : () => courseService.getCourse(),
        queryKey: 'courses-list',
        cacheTime : 10000
    })

    return (
        <section className="section-1">
            <div className="container">
                <h2 className="main-title">KHÓA HỌC SPACEDEV</h2>
                <p className="top-des">
                    Cho dù bạn muốn tìm kiếm công việc, khởi nghiệp, phát triển hoạt động kinh doanh hay chỉ đơn giản là muốn khám phá thế giới, hãy chọn lộ trình học tập mà bạn muốn và bắt đầu câu chuyện thành công của bạn.
                </p>
                <div className="textbox" style={{ marginTop: '100px' }}>
                    <h3 className="sub-title">KHÓA HỌC</h3>
                    <h2 className="main-title">OFFLINE</h2>
                </div>
                <div className="list row">
                    {   
                        loading ? Array.from(Array(6)).map((_, i) => <CourseCardLoading key={i}/>) : 
                        courses.map(e => <CourseCard key={e.id} {...e} />)
                    }
                </div>
            </div>
        </section>
    )
}