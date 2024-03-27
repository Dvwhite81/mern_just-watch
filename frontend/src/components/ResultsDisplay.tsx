import { MovieResult, SeriesResult } from '../utils/types';
import ResultCard from './ResultCard';

interface ResultsDisplayProps {
  label: string;
  results: MovieResult[] | SeriesResult[];
}

const ResultsDisplay = ({ label, results }: ResultsDisplayProps) => {
  return (
    results.length > 0 && (
      <div className="results-display">
        <h3>{label}</h3>
        <div className="results-cards">
          {results &&
            results.map((result, index) => (
              <ResultCard key={index} result={result} />
            ))}
        </div>
      </div>
    )
  );
};

export default ResultsDisplay;
