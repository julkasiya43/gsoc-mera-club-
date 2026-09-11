import OpenSourceEvents from '../components/OpenSourceEvents/OpenSourceEvents';
import './openSourcePage.css';

const OpenSourcePage = () => {
  return (
      <main className="open-source-page">
        <div className="open-source-page-bg-gradient">
          <img src="/Components/Gradient.svg" alt="" aria-hidden="true" />
        </div>
        <OpenSourceEvents />
      </main>
  );
};

export default OpenSourcePage;
