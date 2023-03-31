import React, { useEffect, useRef } from 'react'

export default function TeamGallery() {
    const ref = useRef()
    useEffect(()=>{
        const $this = $(ref.current)
        function teamSlider() {
        let $carouselGallery = $this.find(" .list"),
            $progressBar = $this.find(" .timeline .process");

        $carouselGallery.flickity({
            contain: true,
            wrapAround: false,
            freeScroll: true,
            cellAlign: 'left',
            lazyLoad: 3,
            imagesLoaded: true,
            prevNextButtons: false
        });
        // var flkty = $carousel.data('flickity');
        // var $imgs = $('.homepage .section-4 .list .carousel-cell img');

        // $carousel.on('scroll.flickity', function (event, progress) {
        //     flkty.slides.forEach(function (slide, i) {
        //         var img = $imgs[i];
        //         var x = (slide.target + flkty.x) * -1 / 14;
        //         img.style.transform = 'translateX( ' + x + 'px)';
        //     });
        // });

        $carouselGallery.on('scroll.flickity', function (event, progress) {
            progress = Math.max(0.05, Math.min(1, progress));
            $progressBar.width(progress * 100 + '%');
        });

        let ctrPrevGallery = $this.find(" .btn_ctr.prev"),
            ctrNextGallery = $this.find(" .btn_ctr.next");

        ctrPrevGallery.on('click', function () {
            $carouselGallery.flickity('previous');
        });
        ctrNextGallery.on('click', function () {
            $carouselGallery.flickity('next');
        });
    }
    teamSlider();
    },[])
    return (
        <section className="section-gallery" ref={ref}>
                <div className="textbox">
                    <h2 className="main-title">Hình ảnh hoạt động</h2>
                </div>
                <div className="list">
                    <div className="item">
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-1.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-2.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-3.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-4.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-5.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-6.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-7.jpg" alt="" />
                    </div>
                    </div>
                    <div className="item">
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-8.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-9.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-10.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-11.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-12.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-13.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-14.jpg" alt="" />
                    </div>
                    </div>
                    <div className="item">
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-15.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-16.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-17.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-18.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-19.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-20.jpg" alt="" />
                    </div>
                    <div>
                        <img data-flickity-lazyload="img/gallery/cfd-team-21.jpg" alt="" />
                    </div>
                    </div>
                </div>
                <div className="controls">
                    <div className="btn_ctr prev" />
                    <span>Trượt qua</span>
                    <div className="timeline">
                    <div className="process" />
                    </div>
                    <div className="btn_ctr next" />
                </div>
        </section>
    )
}
