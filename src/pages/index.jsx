import { useQuery } from '@/hooks/useQuery'
import React, { useState } from 'react'
import { CourseCard, CourseCardLoading } from '../components/CourseCard'
import { Modal } from '../components/Modal'
import TeamGallery from '../components/TeamGallery'
import Testimonial from '../components/Testimonial'
import { useFetch } from '../hooks/useFetch'
import { useScrollTop } from '../hooks/useScrollTop'
import { courseService } from '../services/course'

export default function Home() {
    const {data: {data : courses = [] } = {} , loading }= useQuery({
        queryFn : () => courseService.getCourse('?limit=6'),
        queryKey : 'courses-index',
        cacheTime : 10000
    })
    // const {data: courses = [] , loading } = useFetch(()=>courseService.getCourse('?limit=6'))
    
    const [isOpenVideoModal, setIsOpenModal] = useState(false)


    useScrollTop()
    return (
        <main className="homepage" id="main">
            <div className="banner jarallax">
                <div className="container">
                    <div className="content">
                        <h2 className="title">Kiến thức</h2>
                        <h2 className="title">mở ra trang mới cuộc đời bạn</h2>
                        <div className="btn main round">KHÓA HỌC</div>
                    </div>
                </div>
                <div className="jarallax-img">
                    <img data-src="img/bg-cover.jpg" alt="" className="lazyload" />
                    <div className="video-bg lazyload" data-src="video/Spacedev-video-bg2.mp4" />
                </div>
            </div>
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
            <section className="section-different">
                <div className="container">
                    <div className="row">
                        <div className="titlebox col-md-6 col-sm-12 col-xs-12">
                            <h2 className="main-title white textleft">Những điều <br /><span>đặc biệt</span> tại Spacedev</h2>

                            <Modal maskeCloseable visbile={isOpenVideoModal} onCancel={()=>setIsOpenModal(false)} >
                                <iframe width="800" height="450" src="https://www.youtube.com/embed/v86bwAYDcHI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </Modal>

                            <div className="videodif" data-src="video/cfd-video-intro.mp4">
                                <img src="./img/img-cfd-dac-biet.jpg" alt="" />

                                <div className="play-btn btn-video-intro" onClick={()=> setIsOpenModal(true)} >
                                    <img src="img/play-icon.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="contentbox col-md-6 col-sm-12 col-xs-12">
                            <div className="item">
                                <h4>Không cam kết đầu ra</h4>
                                <p>Với Spacedev thì việc cam kết đầu ra nó sẽ không có ý nghĩa nếu như cả người hướng dẫn và
                                    người
                                    học không thật sự tâm huyết và cố gắng. Vì thế, đội ngũ Spacedev sẽ làm hết sức để giúp các
                                    thành
                                    viên tạo ra sản phẩm có giá trị, thay vì cam kết.
                                </p>
                            </div>
                            <div className="item">
                                <h4>Không chỉ là một lớp học</h4>
                                <p>Spacedev không phải một lớp học thuần túy, tất cả thành viên là một team, cùng hổ trợ, chia sẻ
                                    và
                                    giúp đỡ nhau trong suốt quá trình học và sau này, với sự hướng dẫn tận tâm của các thành
                                    viên đồng sáng lập.
                                </p>
                            </div>
                            <div className="item">
                                <h4>Không để ai bị bỏ lại phía sau</h4>
                                <p>Vì chúng ta là một team, những thành viên tiếp thu chậm sẽ được đội ngũ Spacedev kèm cặp đặc
                                    biệt,
                                    cùng sự hổ trợ từ các thành viên khác. Vì mục tiêu cuối cùng là hoàn thành
                                    khóa
                                    học thật tốt.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section class="section-3">
            <div class="container">
                <div class="video">
                    <iframe id="video-intro"
                        src="https://www.youtube-nocookie.com/embed/6t-MjBazs3o?controls=0&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen allowscriptaccess="always"></iframe>

                    <div class="video-src" data-src="video/Spacedev-video-intro.mp4"></div>
                    <div class="play-btn btn-video-intro">
                        <img src="img/play-video-btn.png" alt="">
                    </div>
                </div>
            </div>
        </section> */}
            <Testimonial />
            <TeamGallery />
            <section className="section-action">
                <div className="container">
                    <h3>Bạn đã sẵn sàng trở thành chiến binh tiếp theo của Team Spacedev chưa?</h3>
                    <div className="btn main round bg-white">Đăng ký</div>
                </div>
            </section>
        </main>
    )
}