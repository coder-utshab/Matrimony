import { useQuery } from '@tanstack/react-query';
import CountUpModule from 'react-countup';
// Vite sometimes resolves CJS interop poorly, resulting in a nested default object
const CountUp = (CountUpModule && typeof CountUpModule === 'object' && CountUpModule.default) 
  ? (typeof CountUpModule.default === 'function' ? CountUpModule.default : (CountUpModule.default.default || CountUpModule.default)) 
  : CountUpModule;
import { useInView } from 'react-intersection-observer';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FiUsers, FiHeart } from 'react-icons/fi';
import { IoMaleFemale, IoMale, IoFemale } from 'react-icons/io5';

const SuccessCounter = () => {
  const axiosPublic = useAxiosPublic();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { data: stats } = useQuery({
    queryKey: ['biodataStats'],
    queryFn: async () => {
      const res = await axiosPublic.get('/biodatas/count');
      return res.data;
    }
  });

  // Fallback stats if API fails or empty
  const defaultStats = {
    total: 1250,
    male: 650,
    female: 600,
    marriages: 145
  };

  const displayStats = stats?.total ? stats : defaultStats;

  return (
    <section className="counter-section" ref={ref}>
      <div className="container">
        <div className="section-title">
          <span>Statistics</span>
          <h2>Our Success in Numbers</h2>
          <p>We take pride in connecting thousands of hearts across the country.</p>
        </div>

        <div className="counter-grid">
          <div className="counter-card">
            <FiUsers className="counter-icon" />
            <div className="counter-number">
              {inView ? <CountUp end={displayStats.total} duration={2.5} /> : '0'}
            </div>
            <div className="counter-label">Total Biodatas</div>
          </div>

          <div className="counter-card">
            <IoFemale className="counter-icon" />
            <div className="counter-number">
              {inView ? <CountUp end={displayStats.female} duration={2.5} /> : '0'}
            </div>
            <div className="counter-label">Girls Biodatas</div>
          </div>

          <div className="counter-card">
            <IoMale className="counter-icon" />
            <div className="counter-number">
              {inView ? <CountUp end={displayStats.male} duration={2.5} /> : '0'}
            </div>
            <div className="counter-label">Boys Biodatas</div>
          </div>

          <div className="counter-card">
            <FiHeart className="counter-icon" />
            <div className="counter-number">
              {inView ? <CountUp end={displayStats.marriages} duration={2.5} /> : '0'}
            </div>
            <div className="counter-label">Marriages Completed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessCounter;
