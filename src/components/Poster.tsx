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
  language: string;
  genreIds: number[];
  genres: Genre[];
}

interface Genre {
  id: number;
  name: string;
}

function Poster({
  title,
  releaseDate,
  overview,
  rating,
  poster,
  movieId,
  language,
  genreIds,
  genres,
}: InfoProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [movieTrailer, setMovieTrailer] = useState<any[]>([]);

  const fetchMovieVideo = (id: number) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=331ec3900ed83ab3e842d5271e840508`
    )
      .then((res) => res.json())
      .then((data) => {
        const trailers = data.results.filter(
          (video: any) => video.site === "YouTube" && video.type === "Trailer"
        );
        setMovieTrailer(trailers);
      })
      .catch((error) => {
        console.log("Error fetching videos: ", error);
      });
  };

  const getGenreNames = () => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter((name) => name)
      .join(", ");
  };

  const handleClick = () => {
    setExpanded(!expanded);

    setHovered(false);

    if (!expanded) {
      fetchMovieVideo(movieId);
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
          <div className="d-flex flex-column justify-content align-items-center gap-5 m-3">
            <div className="overview w-50">
              <h3>Overview</h3>
              <p>{overview}</p>
            </div>
            <div className="d-flex flex-column justify-content-start align-items-center gap-3">
              <h4>
                <b>Release Date: </b> {releaseDate}
              </h4>
              <h4>
                <b>Rating: </b>
                {rating.toFixed(1)}
              </h4>
              <h4>
                <b>Language: </b>
                {language}
              </h4>
              <h4>
                <b>Genres: </b>
                {getGenreNames()}
              </h4>
            </div>

            {movieTrailer.length > 0 ? (
              movieTrailer.map((video) => (
                <iframe
                  key={video.key}
                  width="50%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name || "Trailer"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ))
            ) : (
              <p>
                <b>No trailer available</b>
              </p>
            )}
          </div>
        )}
      </motion.div>
    </>
  );
}

export default Poster;
