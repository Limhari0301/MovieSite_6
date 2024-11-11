// src/components/MovieDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// 스타일 정의
const DetailContainer = styled.div`
  padding: 20px;
  color: white;
  background-color: #1a1a1a;
  border-radius: 10px;
  max-width: 1200px;
  margin: 20px auto;
`;

const MovieTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const MovieOverview = styled.p`
  font-size: 1.1rem;
  margin-bottom: 15px;
`;

const MovieImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const DetailItem = styled.div`
  font-size: 1rem;
  margin-bottom: 5px;
`;

const CastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const CastMember = styled.div`
  flex: 1 0 13%; /* 7명씩 배치 */
  max-width: 13%; /* 7명씩 정확히 배치하기 위한 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CastImage = styled.img`
  width: 80%;  /* 이미지 크기 조정 */
  border-radius: 50%;
  border: 2px solid #fff;
  object-fit: cover; /* 비율을 유지하며 이미지 조정 */
`;

const MovieDetail = () => {
  const { movieId } = useParams(); // URL에서 movieId 가져오기
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDNiMGUwZmY1ODhiODlmZmRiYjlmNzNhN2Y4NmY4OSIsIm5iZiI6MTcyODM3NTI4MC44MTg2OTMsInN1YiI6IjY3MDM3MjdlMTc0YTFkNTc3Mzc5NDY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bpXLaP04e3UudI3UafbK4Leatg_d8mielcGUOqqEl-8`
            // API 토큰
          }
        });
        setMovie(movieResponse.data);

        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDNiMGUwZmY1ODhiODlmZmRiYjlmNzNhN2Y4NmY4OSIsIm5iZiI6MTcyODM3NTI4MC44MTg2OTMsInN1YiI6IjY3MDM3MjdlMTc0YTFkNTc3Mzc5NDY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bpXLaP04e3UudI3UafbK4Leatg_d8mielcGUOqqEl-8`
            // API 토큰
          }
        });
        setCredits(creditsResponse.data.cast);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <DetailContainer>
      <MovieTitle>{movie.title}</MovieTitle>
      <MovieDetails>
        <DetailItem>평점 {movie.vote_average}</DetailItem>
        <DetailItem>개봉 {movie.release_date.split('-')[0]}</DetailItem>
        <DetailItem> {movie.runtime} 분</DetailItem>
      </MovieDetails>
      <MovieImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <MovieOverview>{movie.overview}</MovieOverview>
      <h2>출연진</h2>
      <CastContainer>
        {credits && credits.slice(0, 14).map((cast) => (
          <CastMember key={cast.id}>
            <CastImage src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} />
            <span>{cast.name}</span>
          </CastMember>
        ))}
      </CastContainer>
    </DetailContainer>
  );
};

export default MovieDetail;
