import React, { useMemo, useState } from 'react'
import { generatePath, Link, useParams, useSearchParams } from 'react-router-dom'
import { Accordion } from '../../components/Accordion'
import { CourseCard } from '../../components/CourseCard'
import Skeleton from '../../components/Skeleton'
import { PATH } from '../../config/path'
import { useFetch } from '../../hooks/useFetch'
import { useScrollTop } from '../../hooks/useScrollTop'
import { courseService } from '../../services/course'
import { currency } from '../../utils/currency'
import moment from 'moment'
import { Teacher } from '@/components/Teacher'
import Page404 from '../404'
import { Modal } from '@/components/Modal'
import { useQuery } from '@/hooks/useQuery'

/**
 * dynamic router là router động, thông tin được lưu trên url giúp cho refresh lại không mất trạng thái
 * 
 * param url là giá trị lưu trên url
 * Thường sử dụng cho trang detail của post, product, category,...
 * 
 * search url là giá trị trên url phía sau dấu ?
 * Thường dùng để lưu trữ giá trị của một biến vd: paginate, filter, sort,....
 */

    // const [detail, setDetail] = useState()

    // useEffect(() => {
    //     let course = courseService.getCourseDetail(parseInt(id))
    //     setDetail(course)
    // }, [id])

    // const [relative, setRelative] = useState(() => {
    //     return courseService.getRelative(id)
    // })

export default function CourseDetail() {
    const { id } = useParams()
    const [isOpenVideoModal, setIsOpenVideoModal] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [activeAccordion, setActiveAccordion] = useState (-1)
    useScrollTop([id])
    
    // const { data , loading } = useFetch(() => courseService.getCourseDetail(id), [id])
    const { data : { data: detail } = {} , loading } = useQuery({
        queryFn: () => courseService.getCourseDetail(id),
        queryKey : `course-${id}`,
        storeDriver : 'sessionStorage',
        // dependencyList: [id]
    }) 

    // const { data: related, loading: relatedLoading } = useFetch(() => courseService.getRelative(id), [id])
    const { data: { data: related = [] } = {}, loading : relatedLoading } = useQuery({
        queryFn: () => courseService.getRelative(id),
        queryKey : `course-related-${id}`,
        storeDriver : 'sessionStorage'
    })

    // const {data : detail } = {data}

    const { openningTime, registerPath } = useMemo(() => {
        if(detail){
            const registerPath = generatePath(PATH.courseRegister, { slug: detail.slug, id: detail.id })
            const openningTime = moment(detail.opening_time).format('DD/MM/YYYY')
            return {
                registerPath, openningTime
            }
        }
        return {}
    },[detail])

    if (loading) {
        return <main className="course-detail" id="main">
                <section className="banner style2" style={{ '--background': '#cde6fb' }}>
                    <div className="container">
                        <div className="info">
                            <h1>
                                <Skeleton width={500} height={64} />
                            </h1>
                            <div className="row">
                                <div className="date">
                                    <Skeleton width={200} height={24} />
                                </div>
                                <div className="time">
                                    <Skeleton width={200} height={24} />
                                </div>
                            </div>
                            <div style={{ marginTop: 40 }}>
                                <Skeleton height={46} width={138} />
                            </div>
                        </div>
                    </div>
                </section >
            </main >
    }
    if (!detail) return <Page404/>
    
    return (
        <main className="course-detail" id="main">
            <section className="banner style2" style={{ '--background': detail.template_color_btn ||'#cde6fb' }}>
                <div className="container">
                    <div className="info">
                        <h1>{detail.title}</h1>
                        <div className="row">
                            <div className="date"><strong>Khai giảng:</strong>{openningTime}</div>
                            <div className="time"><strong>Thời lượng:</strong> 18 buổi</div>
                        </div>
                        <Link className="btn white round" style={{ '--color-btn':  detail.template_color_banner ||'#70b6f1' }} to={registerPath}>đăng ký</Link>
                    </div>
                </div>
                <div className="bottom">
                    <div className="container">
                        <div className="video" onClick={() => setIsOpenVideoModal(true)}>
                            <div className="icon">
                                <img src="/img/play-icon-white.png" alt="" />
                            </div> <span>giới thiệu</span>
                        </div>
                        <div className="money">{currency(detail.money)}</div>
                    </div>
                    <Modal maskeCloseable visbile={isOpenVideoModal} onCancel={() => setIsOpenVideoModal(false)}>
                        <iframe width="850" height="500" src="https://www.youtube.com/embed/EGJKJh8gIyU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </Modal>
                </div>
            </section >
            <section className="section-2">
                <div className="container">
                    <p className="des">{detail.long_description}</p>
                    <h2 className="title">giới thiệu về khóa học</h2>
                    <div className="cover">
                        <img src="/img/course-detail-img.png" alt="" />
                    </div>
                    <h3 className="title">nội dung khóa học</h3>
                    <Accordion.Group>
                        {
                            detail.content.map((e, i) => <Accordion date={i+1} key={i} {...e}>{e.content}</Accordion>)
                        }
                    </Accordion.Group>

                    <h3 className="title">yêu cầu cần có</h3>
                    <div className="row row-check">
                        {
                            detail.required.map((e, i) => <div key={i} className="col-md-6">{e.content}</div> ) 
                        }
                    </div>
                    <h3 className="title">hình thức học</h3>
                    <div className="row row-check">
                        {
                            detail.benefits.map((e, i) => <div key={i} className="col-md-6">{e.content}</div> ) 
                        }
                    </div>
                    <h3 className="title">
                        <div className="date-start">lịch học</div>
                        <div className="sub">*Lịch học và thời gian có thể thống nhất lại theo số đông học viên.</div>
                    </h3>
                    <p>
                        <strong>Ngày bắt đầu: </strong> {openningTime} <br />
                        <strong>Thời gian học: </strong>{detail.schedule}
                    </p>

                    <h3 className="title">Người dạy</h3>
                    <div className="teaches">
                        <Teacher {...detail.teacher}/>
                    </div>
                    {
                        detail.mentor.length > 0 && <>
                            <h3 className="title">Người hướng dẫn</h3>
                            <div className="teaches">
                                {
                                    detail.mentor.map(e => <Teacher key={e.id} {...e}/>)
                                }
                            </div>
                        </>
                    }
                    <div className="bottom">
                        <div className="user">
                            <img src="/img/user-group-icon.png" alt="" /> 12 bạn đã đăng ký
                        </div>
                        <Link className="btn main btn-register round" to={registerPath}>đăng ký</Link>
                        <div className="btn-share btn overlay round btn-icon">
                            <img src="/img/facebook.svg" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-4">
                <div className="container">
                    <div className="textbox">
                        <h3 className="sub-title">Khóa học</h3>
                        <h2 className="main-title">Liên quan</h2>
                    </div>
                    <div className="list row">
                        {
                            related && related?.map(e => <CourseCard key={e.id} {...e} />)
                        }
                    </div>
                </div>
            </section>
        </main >
    )
}