import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  movies: [],
  selectedMovie: undefined
};
export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function gotMovies(movies) {
    console.log("Actions >>> ", movies)
    dispatch({
      type: "GOT_MOVIES",
      payload: movies
    });
  }

  function gotMovie(movie) {
    dispatch({
      type: "GOT_MOVIE",
      payload: movie
    });
  }

  console.log("state is >>>>> ", state)
  return (
    <GlobalContext.Provider
      value={{
        movies: state.movies,
        selectedMovie: state.selectedMovie,
        gotMovies,
        gotMovie
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
