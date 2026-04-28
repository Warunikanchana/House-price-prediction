import Home from '../Components/Home';
import About from '../Components/About';
import Property from '../Components/Property';

function HomePage({ currentRole, properties, allLoaded, canVote, onVote, onViewMore }) {
  return (
    <>
      <Home currentRole={currentRole} />
      <About />
      <Property
        properties={properties}
        allLoaded={allLoaded}
        canVote={canVote}
        onVote={onVote}
        onViewMore={onViewMore}
      />
    </>
  );
}

export default HomePage;
