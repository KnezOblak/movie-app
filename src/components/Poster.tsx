import { useState } from "react";
import "./Poster.css";

interface InfoProps {
  movieId: number;
  title: string;
  releaseDate: string;
  overview: string;
  rating: number;
  poster: string | null;
}

function Poster({
  title,
  releaseDate,
  overview,
  rating,
  poster,
  movieId,
}: InfoProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);

  const height = Math.random() > 0.5 ? "450px" : "350px";

  const handleClick = () => {
    setExpanded(!expanded);
    if (expanded) {
      setHovered(false);
    }
  };

  return (
    <>
      <div
        className={`movie-poster overflow-auto ${expanded ? "expanded" : ""}`}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => !expanded && setHovered(false)}
      >
        {poster ? (
          <img
            className=""
            src={`https://image.tmdb.org/t/p/original/${poster}`}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center 
              rounded movie-poster-placeholder"
          >
            No Image Available
          </div>
        )}
        {hovered && !expanded && (
          <div className="d-flex flex-column gap-2 m-2">
            <h3>{title}</h3>
            <h4>{rating.toFixed(1)}</h4>
            <h5>Click to see more</h5>
          </div>
        )}
        {expanded && (
          <div className="d-flex flex-column justify-content m-3">
            <p>{overview}</p>
            <h4>{releaseDate}</h4>
            <h4>{rating.toFixed(1)}</h4>
          </div>
        )}
      </div>
    </>
  );
}

export default Poster;
