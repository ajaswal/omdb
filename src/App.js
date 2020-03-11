import React, { useState, useEffect, useContext, useReducer } from "react";
import styled from "styled-components";

import { GlobalProvider } from "./context/GlobalState";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";

function App() {
  return (
    <GlobalProvider>
      <Search />
      <StyledWrapper>
        <MovieList />
        <MovieDetail />
      </StyledWrapper>
    </GlobalProvider>
  );
}

const StyledWrapper = styled.div`
  display: grid;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 400px 520px;
`;

export default App;
