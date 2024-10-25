import { useState, useEffect } from "react";
import Info from "../Info";
import "./MovieList.css";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  poster_path: string | null;
}

function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [clickedId, setClickedId] = useState<number | null>(null);

  const generateRandomPage = () => {
    const number = Math.floor(Math.random() * 500 + 1);
    return number;
  };

  const getMovieRequest = () => {
    const randomPage = generateRandomPage();
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=331ec3900ed83ab3e842d5271e840508&page=${randomPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
      })
      .catch((error) => {
        console.log("Error fetching movies: ", error);
      });
  };

  const handleMovieClick = (movieId: number) => {
    setClickedId(movieId);
    setHoveredId(null);
  };

  const handleCloseButton = () => {
    setClickedId(null);
    console.log(clickedId);
  };

  useEffect(() => {
    getMovieRequest();
  }, []);

  return (
    <>
      <div className="container-fluid justify-content-center">
        <div className="row g-2">
          {movies.map((movie) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 p-0 gap-2 position-relative image-container"
              key={movie.id}
              onMouseEnter={() => setHoveredId(movie.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="movie-poster-wrapper position-relative">
                <img
                  className="movie-poster position-absolute img-fluid "
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                {hoveredId === movie.id && clickedId !== movie.id && (
                  <div className="position-absolute  hover-overlay">
                    <div className="d-flex flex-column position-absolute p-3 z-1">
                      <h4>{movie.title}</h4>
                      <h6 className="d-flex gap-2 align-items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="orange"
                          className="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>

                        {movie.vote_average.toFixed(1)}
                      </h6>
                      <p style={{ color: "rgb(210, 0, 0)" }}>
                        <small>Click to see more</small>
                      </p>
                    </div>
                  </div>
                )}
                {clickedId === movie.id && (
                  <>
                    <Info
                      title={movie.title}
                      releaseDate={movie.release_date}
                      rating={movie.vote_average}
                      overview={movie.overview}
                      onClose={handleCloseButton}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MovieList;
