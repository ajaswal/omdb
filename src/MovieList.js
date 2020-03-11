import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { GlobalContext } from "./context/GlobalState";
import Selexted from "./selected.svg";

export default function MovieList() {
  const [movieId, setMovieId] = useState("1");
  const [movieDetail, setMovieDetail] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const { movies, gotMovie } = useContext(GlobalContext);
 
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=c4b21b04&i=${movieId}`
      );
      const json = await response.json();
      gotMovie(json)
      setMovieDetail(json);
    }
    fetchData();
  }, [movieId]);
  return (
    <div>
      {movies.Search &&
        movies.Search.map((result, index) => (
          <StyledDiv key={index} onClick={e => setMovieId(result.imdbID)}>
            <h4>
              <span>
                {result.imdbID === movieDetail.imdbID ? "Selected " : ""}
                {result.Title}
              </span>
              {result.imdbID === movieDetail.imdbID && (
                <img src={Selexted} width={25} alt="selected" />
              )}
            </h4>
            <StyledYear>{result.Year}</StyledYear>
          </StyledDiv>
        ))}

      {Number(movies.totalResults) > 10 && (
        <StyledPagination>
          <p>
            <button
              onClick={e => pageNumber > 1 && setPageNumber(pageNumber - 1)}
            >
              &#60;
            </button>
            Page
            {pageNumber}
            <button onClick={e => setPageNumber(pageNumber + 1)}>&#62;</button>
          </p>
          <span>{movies.totalResults || 0} results</span>
        </StyledPagination>
      )}
    </div>
  );
}
const StyledDiv = styled.div`
  border: 1px solid #000;
  padding: 10px;
  margin: 10px;
`;

const StyledYear = styled.span`
  display: flex;
  flex-flow: row-reverse;
`;

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
