import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <Swiper
        effect={'fade'}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Pagination]}
        className="banner-slider"
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      >
        <SwiperSlide>
          <div className="banner-bg">
            <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Wedding Couple" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner-bg">
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" alt="Wedding Rings" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner-bg">
            <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" alt="Wedding Ceremony" />
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="banner-content">
          <div className="banner-tag">
            <span>✨ Premium Matrimony Service</span>
          </div>
          <h1>Find Your Perfect <br /><span className="highlight">Life Partner</span></h1>
          <p>
            Join thousands of happy couples who found their soulmates through our premium matrimony platform. Your search for true love ends here.
          </p>
          <div className="banner-btns">
            <Link to="/biodatas" className="btn-primary">Browse Profiles</Link>
            <Link to="/register" className="btn-secondary">Create Free Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
