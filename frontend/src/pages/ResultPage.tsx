import { useLocation, useParams } from 'react-router-dom';

const ResultPage = () => {
  console.log('ResultPage');
  const { imdbId } = useParams();
  const { state } = useLocation();
  const { details, type } = state;
  console.log('imdbId:', imdbId);
  console.log('state:', state);
  console.log('details:', details);

  const result =
    type === 'movie' ? details.movie_results[0] : details.tv_results[0];

  console.log('result:', result);
  return (
    <div className="page result-page">
      <p>{result.title}</p>
      <img
        className="result-page-img"
        src={`http://image.tmdb.org/t/p/w500${result.poster_path}`}
      />
    </div>
  );
};

export default ResultPage;
