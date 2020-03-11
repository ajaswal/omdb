import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from './context/GlobalState';

function Search() {
  const [searchText, setSearchText] = useState("");
  const { gotMovies } = useContext(GlobalContext);
  const debounceSearchText = useDebounce(searchText, 500);
  
  useEffect(() => {
    if (debounceSearchText) {
      omdbRequest(debounceSearchText).then(res => {
        gotMovies(res)
      });
    } else {
      gotMovies([]);
    }
  }, [debounceSearchText]);

  return (
    <div>
      <StyledInput
        placeholder="Search movies"
        onChange={e => {
          setSearchText(e.target.value);
        //   setPageNumber(1);
        }}
      />
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

const StyledInput = styled.input`
  width: 360px;
  border-radius: 5px;
  padding: 10px;
  margin: 5px 10px;
  font-size: 16px;
`;
export default Search;
