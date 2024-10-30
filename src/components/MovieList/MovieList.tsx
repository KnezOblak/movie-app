import { useState, useEffect } from "react";
import "./MovieList.css";
import Masonry from "react-masonry-css";
import Poster from "../Poster";

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

  const generateRandomPage = () => Math.floor(Math.random() * 500 + 1);

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

  useEffect(() => {
    getMovieRequest();
  }, []);

  const breakpointsColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    300: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointsColumnsObj}
        className="d-flex masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {movies.map((movie) => (
          <div key={movie.id}>
            <Poster
              movieId={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              overview={movie.overview}
              rating={movie.vote_average}
              poster={movie.poster_path}
            />
          </div>
        ))}
      </Masonry>
    </>
  );
}

export default MovieList;
