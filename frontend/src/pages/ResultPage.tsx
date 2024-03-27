import { useLocation, useParams } from 'react-router-dom';

const ResultPage = () => {
  console.log('ResultPage');
  const { imdbId } = useParams();
  const { state } = useLocation();
  const { details } = state;
  console.log('imdbId:', imdbId);
  console.log('state:', state);
  console.log('details:', details);

  return (
    <div className="page result-page">
      <p>{details.movie_results[0].title || details.tv_results[0].title}</p>
    </div>
  );
};

export default ResultPage;
