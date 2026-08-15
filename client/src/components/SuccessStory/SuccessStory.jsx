import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa';

const SuccessStory = () => {
  const axiosPublic = useAxiosPublic();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['successStories'],
    queryFn: async () => {
      const res = await axiosPublic.get('/success-stories');
      return res.data;
    }
  });

  const mockStories = [
    { _id: 1, coupleImage: 'https://images.unsplash.com/photo-1583939411023-14783179e581?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', marriageDate: '2024-02-14', reviewStar: 5, successStory: "We found each other on Matrimony and it was love at first sight. The platform made it so easy to connect!" },
    { _id: 2, coupleImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', marriageDate: '2023-11-20', reviewStar: 5, successStory: "Thank you Matrimony for helping me find my perfect soulmate. The premium feature really helped me connect instantly." },
    { _id: 3, coupleImage: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', marriageDate: '2023-08-05', reviewStar: 4, successStory: "A wonderful platform with verified profiles. We met here and our families instantly clicked. Highly recommended!" },
  ];

  const displayStories = stories.length > 0 ? stories : mockStories;

  // Sorting ascending to descending based on marriage date
  const sortedStories = [...displayStories].sort((a, b) => new Date(b.marriageDate) - new Date(a.marriageDate));

  return (
    <section className="success-section">
      <div className="container">
        <div className="section-title">
          <span>Testimonials</span>
          <h2>Success Stories</h2>
          <p>Read heartwarming stories from couples who found their soulmates on our platform.</p>
        </div>

        {isLoading ? (
          <div className="loading-container"><div className="loading-spinner"><div className="spinner-ring"></div></div></div>
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Autoplay, Pagination]}
            className="stories-slider pb-12"
          >
            {sortedStories.map((story) => (
              <SwiperSlide key={story._id} style={{ paddingBottom: '40px' }}>
                <div className="story-card">
                  <div className="story-header">
                    <img src={story.coupleImage} alt="Couple" className="story-img" />
                    <div className="story-info">
                      <div className="story-stars">
                        {[...Array(story.reviewStar)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <div className="story-date">Married on: {new Date(story.marriageDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="story-text">
                    "{story.successStory}"
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default SuccessStory;
