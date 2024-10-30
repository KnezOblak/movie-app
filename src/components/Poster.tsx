import { useState } from "react";
import "./Poster.css";
import { motion } from "framer-motion";

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
      <motion.div
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
          <motion.div
            className="hovered-info"
            initial={{ opacity: 0, height: "0%" }}
            animate={{ opacity: 1, height: "100%" }}
            exit={{ opacity: 0, height: "0%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgb(0, 0, 0, 0.8)",
              padding: "1rem",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <h4>{title}</h4>
            <h5>{rating.toFixed(1)}</h5>
            <p>Click to see more</p>
          </motion.div>
        )}
        {expanded && (
          <div className="d-flex flex-column justify-content m-3">
            <p>{overview}</p>
            <h4>{releaseDate}</h4>
            <h4>{rating.toFixed(1)}</h4>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default Poster;
