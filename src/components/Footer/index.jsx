import React from 'react'

export default function Footer() {
  return (
    <footer id="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-5 left">
                        <p className="des">Kiến Thức mở Ra Trang Mới Cuộc Đời Bạn</p>
                        <p className="address">
                            Tòa nhà Robot, 308, Điện Biên Phủ, Phường 4, Quận 3, TP. Hồ Chí Minh
                        </p>
                        <p className="phone">(+84) 949 816 596</p>
                        <div className="social">
                            <a href="#">
                              <img src="/img/fb-icon.png" alt="" />
                            </a>
                            <a href="#">
                              <img src="/img/email-icon.png" alt="" />
                            </a>
                            <a href="#">
                              <img src="/img/skype-icon.png" alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="right">
                        <nav>
                          <ul>
                            <li>
                              <a href="./">Trang chủ</a>
                            </li>
                            <li>
                              <a href="./course-list.html">Khóa Học</a>
                            </li>
                            <li>
                              <a href="#">Thanh toán</a>
                            </li>
                            <li>
                              <a href="#">Điều khoản</a>
                            </li>
                          </ul>
                        </nav>
                    </div>
                </div>
                <a href="#" className="back-to-top">
                    <div className="line" />
                    CUỘN LÊN
                </a>
            </div>
            <div className="copy-right">
                <div className="container">
                    <p>2020 spacedev.vn</p>
                    <p>Được thiết kế và lập trình bởi Spacedev Team</p>
                </div>
            </div>
        </footer>
  )
}
