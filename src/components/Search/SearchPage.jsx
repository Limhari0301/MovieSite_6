// src/components/Search/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import debounce from 'lodash.debounce';

// MovieCard 컴포넌트는 SearchPage에서만 사용
const SearchContainer = styled.div`
  padding: 20px;
  color: white;
  background-color: #1a1a1a;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  background-color: white;
  padding: 10px 60px 10px 10px; /* 오른쪽 패딩 조정 */
  width: 100%;
  max-width: 1000px;
  border: 3.1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #333;
`;

const SearchButton = styled.button`
  right: 1px; /* 오른쪽 여백 조정 */
  transform: translateY(-20%);
  background-color: #ff007f;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #e60073;
  }
`;

// NoResultsMessage 스타일 추가
const NoResultsMessage = styled.div`
  font-size: 1.7rem;
  color: white;
  text-align: center;
  width: 500%;
  padding: 20px;
  margin-top: 20px;
  position: center;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  font-size: 2rem;
  text-align: center;
`;

// MovieCard 컴포넌트
const MovieCard = styled.div`
  border: 1px
  border-radius: 8px;
  text-align: left;
  background-color: #222;
  color: white;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 330px;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 290px;
  object-fit: cover;
  border-radius: 4px;
`;

const MovieTitle = styled.h3`
  font-size: 1rem;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MovieReleaseDate = styled.p`
  font-size: 1rem;
  color: #ccc;
  margin-top: 0px;
`;

// SkeletonCard 컴포넌트
const loadingAnimation = keyframes`
  0% { background-color: #333; }
  50% { background-color: #444; }
  100% { background-color: #333; }
`;

const SkeletonCard = styled(MovieCard)`
  animation: ${loadingAnimation} 1.5s infinite ease-in-out;
`;

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false); // 검색 버튼 클릭 여부 확인
  
    const fetchMovies = async () => {
      if (searchQuery.trim() === '') {
        setMovies([]);
        return;
      }
  
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=ko-KR`, 
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDNiMGUwZmY1ODhiODlmZmRiYjlmNzNhN2Y4NmY4OSIsIm5iZiI6MTcyODM3NTI4MC44MTg2OTMsInN1YiI6IjY3MDM3MjdlMTc0YTFkNTc3Mzc5NDY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bpXLaP04e3UudI3UafbK4Leatg_d8mielcGUOqqEl-8`
            }
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    // Debounced fetchMovies
    const debouncedFetchMovies = debounce(fetchMovies, 1000); // 1초 지연

    useEffect(() => {
        if (searchQuery) {
        debouncedFetchMovies();
        }
        return () => {
        debouncedFetchMovies.cancel(); // 컴포넌트가 unmount되거나 searchQuery가 변경될 때 debounce 취소
        };
    }, [searchQuery]);

    const handleSearch = () => {
      setHasSearched(true); // 검색이 수행되었음을 표시
      fetchMovies(); // 이 부분은 직접 클릭할 때 API 요청을 보냄
    };
  
    return (
      <SearchContainer>
        <SearchInputWrapper>
          <SearchInput
            type="text"
            placeholder="영화 제목을 입력하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
            <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchInputWrapper>
  
        {loading && <div>로딩 중...</div>}
        {error && <div>오류 발생: {error}</div>}
  
        {/* 검색 버튼을 눌렀을 때, 검색어가 있을 때만 결과 또는 '검색 결과 없음' 메시지 표시 */}
        {hasSearched && (
            <MoviesGrid>
            {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <SkeletonCard key={index} />
                ))
            : movies.length > 0
            ? movies.map((movie) => (
                <MovieCard key={movie.id}>
                    <MovieImage
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    />
                    <MovieTitle>{movie.title}</MovieTitle>
                    <MovieReleaseDate>{movie.release_date}</MovieReleaseDate>
                </MovieCard>
                ))
            : !loading && <NoResultsMessage>해당하는 검색어 "{searchQuery}"에 해당하는 데이터가 없습니다.</NoResultsMessage>}
        </MoviesGrid>
        )}
    </SearchContainer>
  );
};

export default SearchPage;
