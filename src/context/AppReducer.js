export default (state, action) => {
  switch (action.type) {
    case "GOT_MOVIES":
      return {
        ...state,
        movies: action.payload
      };
    case "GOT_MOVIE":
      return {
        ...state,
        selectedMovie: action.payload
      };
    default:
      return state;
  }
};
