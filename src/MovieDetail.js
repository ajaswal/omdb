import React, { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
import styled from "styled-components";

export default function MovieDetail() {
  const { selectedMovie } = useContext(GlobalContext);

  return (
    <div>
      {selectedMovie && selectedMovie.Response === "True" && (
        <StyledMain>
          <StyledDetails>
            <h2>{selectedMovie.Title}</h2>
            <p>{selectedMovie.Genre}</p>
            <p>Movie plot - {selectedMovie.Plot}</p>
            <p>
              <strong>Language:</strong> {selectedMovie.Language}
            </p>
            <p>
              <strong>Director:</strong> {selectedMovie.Director}
            </p>
            <p>
              <strong>Actors:</strong> {selectedMovie.Actors}
            </p>
            <p>
              <strong>Duration:</strong> {selectedMovie.Runtime}
            </p>
          </StyledDetails>
          <StyledPoster>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
          </StyledPoster>
        </StyledMain>
      )}
    </div>
  );
}

const StyledMain = styled.div`
  grid-column: auto;
  grid-row: auto;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 350px auto;
`;
const StyledDetails = styled.div`
  grid-column: 1;
`;

const StyledPoster = styled.div`
  grid-column: 2;
`;
