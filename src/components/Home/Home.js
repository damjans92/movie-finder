import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesAsync,
  fetchShowsAsync,
} from "../../features/movies/movieSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const dispatch = useDispatch();
  const movieText = "Harry";
  const showText = "Friends";

  const isError = useSelector((state) => state.movies.isError);
  const errorMsg = useSelector((state) => state.movies.errorMessage);

  useEffect(() => {
    if (isError) {
      toast.error(errorMsg);
    }

    dispatch(fetchMoviesAsync(movieText));
    dispatch(fetchShowsAsync(showText));
  }, [dispatch, isError, errorMsg]);

  return (
    <>
      <MovieListing />
    </>
  );
}

export default Home;
