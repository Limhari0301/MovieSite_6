import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); /* 카드 최소 너비 조정 */
  gap: 16px;
  padding: 16px;
  width: 100%; /* 컨테이너의 너비를 100%로 설정 */
  max-width: 1200px; /* 최대 너비 설정 */
  margin: 0 auto; /* 가운데 정렬 */
`;

const MovieCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  background-color: #222; /* 배경 색상 추가 */
  color: white; /* 텍스트 색상 */
  overflow: hidden; /* 카드 안의 내용이 넘치지 않도록 */
  cursor: pointer; // 클릭 가능함을 나타냄
`;

const MovieImage = styled.img`
  width: 100%;
  border-radius: 4px;
`;

const MovieTitle = styled.h3`
  font-size: 1rem;
  margin-top: 8px;
  overflow: hidden; /* 텍스트 넘치지 않도록 설정 */
  text-overflow: ellipsis; /* 넘칠 경우 ...로 표시 */
  white-space: nowrap; /* 한 줄로 표시 */
`;

const MovieReleaseDate = styled.p`
  font-size: 0.9rem;
  color: #bbb;
  margin-top: 4px;
`;

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDNiMGUwZmY1ODhiODlmZmRiYjlmNzNhN2Y4NmY4OSIsIm5iZiI6MTcyODM3NTI4MC44MTg2OTMsInN1YiI6IjY3MDM3MjdlMTc0YTFkNTc3Mzc5NDY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bpXLaP04e3UudI3UafbK4Leatg_d8mielcGUOqqEl-8`
        }
      });
      setMovies(response.data.results);
    };

    getMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`); // 상세 페이지로 이동
  };

  return (
    <MoviesContainer>
      {movies.map(movie => (
        <MovieCard key={movie.id} onClick={() => handleMovieClick(movie.id)}>
          <MovieImage src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieReleaseDate>{movie.release_date}</MovieReleaseDate>
        </MovieCard>
      ))}
    </MoviesContainer>
  );
};

export default Popular;
