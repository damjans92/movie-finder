import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import MovieCard from "../MovieCard/MovieCard";
import { settings } from "../../common/settings";
import "./MovieListing.scss";

function MovieListing() {
  const movies = useSelector((state) => state.movies.movies);
  const shows = useSelector((state) => state.movies.shows);
  const isLoadingMovies = useSelector((state) => state.movies.isLoadingMovies);
  const isLoadingShows = useSelector((state) => state.movies.isLoadingShows);
  let renderMovies,
    renderShows = "";

  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => {
        return <MovieCard key={index} data={movie} />;
      })
    ) : (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    );

  renderShows =
    shows.Response === "True" ? (
      shows.Search.map((show, index) => {
        return <MovieCard key={index} data={show} />;
      })
    ) : (
      <div className="movies-error">
        <h3>{shows.Error}</h3>
      </div>
    );

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">
          {isLoadingMovies ? (
            <div
              className="loader"
              style={{ color: "white", textAlign: "center" }}
            ></div>
          ) : (
            <Slider {...settings}>{renderMovies}</Slider>
          )}
        </div>
      </div>
      <div className="show-list">
        <h2>Shows</h2>
        <div className="movie-container">
          {isLoadingShows ? (
            <div
              className="loader"
              style={{ color: "white", textAlign: "center" }}
            ></div>
          ) : (
            <Slider {...settings}>{renderShows}</Slider>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieListing;
