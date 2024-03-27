import { useNavigate } from 'react-router-dom';
import { getDetails } from '../services/apiService';
import { MovieResult, SeriesResult } from '../utils/types';
import { SyntheticEvent } from 'react';

interface ResultCardProps {
  result: MovieResult | SeriesResult;
}

const ResultCard = ({ result }: ResultCardProps) => {
  const navigate = useNavigate();

  const { imdbId, title } = result;

  const handleClick = async (e: SyntheticEvent, imdbId: string) => {
    e.preventDefault();
    console.log('handleClick');
    const details = await getDetails(imdbId);
    console.log('details:', details);
    navigate(`/${imdbId}`, { state: { details } });
  };

  return (
    <div
      className="card"
      onClick={(e: SyntheticEvent) => handleClick(e, imdbId)}
    >
      <p>{title}</p>
    </div>
  );
};

export default ResultCard;
