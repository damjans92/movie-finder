import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchMoviesAsync = createAsyncThunk(
  "movies/fetchMoviesAsync",
  async (term, thunkAPI) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIKey}&s=${term}&type=movie`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchShowsAsync = createAsyncThunk(
  "movies/fetchShowsAsync",
  async (term, thunkAPI) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIKey}&s=${term}&type=series`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMovieOrShowDetailAsync = createAsyncThunk(
  "movies/fetchMovieOrShowDetailAsync",
  async (id, thunkAPI) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIKey}&i=${id}&Plot=full`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
  isLoadingMovies: false,
  isLoadingShows: false,
  isError: false,
  errorMessage: "",
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
    [fetchMoviesAsync.rejected]: (state, action) => {
      state.isLoadingMovies = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    [fetchShowsAsync.pending]: (state) => {
      state.isLoadingShows = true;
    },
    [fetchShowsAsync.fulfilled]: (state, action) => {
      state.isLoadingShows = false;
      state.shows = action.payload;
    },
    [fetchMoviesAsync.rejected]: (state, action) => {
      state.isLoadingShows = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    [fetchMovieOrShowDetailAsync.fulfilled]: (state, action) => {
      state.selectMovieOrShow = action.payload;
    },
    [fetchMovieOrShowDetailAsync.rejected]: (state, action) => {
      state.selectMovieOrShow = action.payload;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export default movieSlice.reducer;
