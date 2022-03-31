import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchMoviesAsync = createAsyncThunk(
  "movies/fetchMoviesAsync",
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);

export const fetchShowsAsync = createAsyncThunk(
  "movies/fetchShowsAsync",
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=series`
    );
    return response.data;
  }
);

export const fetchMovieOrShowDetailAsync = createAsyncThunk(
  "movies/fetchMovieOrShowDetailAsync",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
  isLoadingMovies: false,
  isLoadingShows: false,
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchMoviesAsync.pending]: (state) => {
      state.isLoadingMovies = true;
    },
    [fetchMoviesAsync.fulfilled]: (state, action) => {
      state.isLoadingMovies = false;
      state.movies = action.payload;
    },
    [fetchMoviesAsync.rejected]: (state) => {
      state.isLoadingMovies = false;
    },
    [fetchShowsAsync.pending]: (state) => {
      state.isLoadingShows = true;
    },
    [fetchShowsAsync.fulfilled]: (state, action) => {
      state.isLoadingShows = false;
      state.shows = action.payload;
    },
    [fetchMoviesAsync.rejected]: (state) => {
      state.isLoadingShows = false;
    },
    [fetchMovieOrShowDetailAsync.fulfilled]: (state, action) => {
      return { ...state, selectMovieOrShow: action.payload };
    },
    [fetchMovieOrShowDetailAsync.rejected]: (state, action) => {
      return { ...state, selectMovieOrShow: action.payload };
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export default movieSlice.reducer;
