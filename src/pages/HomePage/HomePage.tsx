import Cta from './CallToAction';
import Values from './ValuesSection';
import Carousel from './Carousel';
import GettingStarted from './GettingStarted';
import HomeOffers from './HomeCatalog';

const HomePage: React.FC = () => {
  return (
    <>
      <Cta />
      <Values />
      <Carousel />
      <HomeOffers />
      <GettingStarted />
    </>
  );
};

export default HomePage;