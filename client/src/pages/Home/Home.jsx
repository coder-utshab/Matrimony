import Banner from '../../components/Banner/Banner';
import PremiumCards from '../../components/PremiumCards/PremiumCards';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import SuccessCounter from '../../components/SuccessCounter/SuccessCounter';
import SuccessStory from '../../components/SuccessStory/SuccessStory';

const Home = () => {
  return (
    <div>
      <Banner />
      <PremiumCards />
      <HowItWorks />
      <SuccessCounter />
      <SuccessStory />
    </div>
  );
};

export default Home;
