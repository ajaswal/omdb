import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Selexted from "./selected.svg";

function App() {
  const [searchText, setSearchText] = useState("");
  const [movieId, setMovieId] = useState("1");
  const [movieDetail, setMovieDetail] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [results, setResults] = useState([]);
  const debounceSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    if (debounceSearchText) {
      omdbRequest(debounceSearchText).then(results => {
        setResults(results);
      });
    } else {
      setResults([]);
    }
  }, [debounceSearchText]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=c4b21b04&i=${movieId}`
      );
      const json = await response.json();
      setMovieDetail(json);
    }
    fetchData();
  }, [movieId]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=c4b21b04&s=${debounceSearchText}&page=${pageNumber}`
      );
      const json = await response.json();
      setResults(json);
    }
    fetchData();
  }, [pageNumber]);

  return (
    <div>
      <StyledInput
        placeholder="Search movies"
        onChange={e => {
          setSearchText(e.target.value);
          setPageNumber(1);
        }}
      />

      <StyledWrapper>
        <div>
          {results.Search &&
            results.Search.map((result, index) => (
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

          {Number(results.totalResults) > 10 && (
            <StyledPagination>
              <p>
                <button
                  onClick={e => pageNumber > 1 && setPageNumber(pageNumber - 1)}
                >
                  &#60;
                </button>
                Page
                {pageNumber}
                <button onClick={e => setPageNumber(pageNumber + 1)}>
                  &#62;
                </button>
              </p>
              <span>{results.totalResults || 0} results</span>
            </StyledPagination>
          )}
        </div>

        {movieDetail.Response === "True" && (
          <StyledMain>
            <StyledDetails>
              <h2>{movieDetail.Title}</h2>
              <p>{movieDetail.Genre}</p>
              <p>Movie plot - {movieDetail.Plot}</p>
              <p>
                <strong>Language:</strong> {movieDetail.Language}
              </p>
              <p>
                <strong>Director:</strong> {movieDetail.Director}
              </p>
              <p>
                <strong>Actors:</strong> {movieDetail.Actors}
              </p>
              <p>
                <strong>Duration:</strong> {movieDetail.Runtime}
              </p>
            </StyledDetails>
            <StyledPoster>
              <img src={movieDetail.Poster} alt={movieDetail.Title} />
            </StyledPoster>
          </StyledMain>
        )}
      </StyledWrapper>
    </div>
  );
}

function omdbRequest(search) {
  const apiKey = "c4b21b04";
  const searchString = search.replace(/\s/, "+");
  return fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchString}`, {
    method: "GET"
  })
    .then(r => r.json())
    .catch(error => {
      console.error(error);
      return [];
    });
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const StyledDiv = styled.div`
  border: 1px solid #000;
  padding: 10px;
  margin: 10px;
`;
const StyledWrapper = styled.div`
  display: grid;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 400px 520px;
`;

const StyledInput = styled.input`
  width: 360px;
  border-radius: 5px;
  padding: 10px;
  margin: 5px 10px;
  font-size: 16px;
`;

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

const StyledYear = styled.span`
  display: flex;
  flex-flow: row-reverse;
`;

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default App;
