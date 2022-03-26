import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import { useDispatch } from "react-redux";
import {
  fetchMoviesAsync,
  fetchShowsAsync,
} from "../../features/movies/movieSlice";

function Home() {
  const dispatch = useDispatch();
  const movieText = "Harry";
  const showText = "Friends";

  useEffect(() => {
    dispatch(fetchMoviesAsync(movieText));
    dispatch(fetchShowsAsync(showText));
  }, [dispatch]);

  return (
    <>
      <MovieListing />
    </>
  );
}

export default Home;
