// src/components/MoviesPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import NowPlaying from './Category/NowPlaying';
import Popular from './Category/Popular';
import TopRated from './Category/TopRated';
import Upcoming from './Category/Upcoming';

const CategoryTitle = styled.h1`
  text-align: left;
  margin-bottom: 20px; /* 제목 아래에 여백 추가 */
`;


const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column; /* 세로 정렬로 설정 */
  max-width: 1200px;
  justify-content: space-around;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  flex-wrap: wrap; /* 버튼이 넘치면 다음 줄로 이동 */
  gap: 20px; /* 버튼 사이의 간격 */
  width: 1000%;
  max-width: 1200px; /* 최대 너비 설정 */
`;

const CategoryButton = styled(Link)`
  cursor: pointer;
  text-align: center;
  width: 285px;
  height: 180px;
  background-color: #f0f0f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden; /* 오버레이가 버튼 범위를 벗어나지 않도록 설정 */

  &:hover .overlay {
    opacity: 1; /* 마우스를 올렸을 때 오버레이가 나타나도록 설정 */
  }

  img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0; /* 이미지가 배경으로 */
  }

  span {
    position: absolute; /* span 요소를 절대 위치로 설정 */
    bottom: 10px; /* 아래쪽 여백 */
    left: 10px; /* 왼쪽 여백 */
    z-index: 1; /* 텍스트가 이미지 위에 표시되도록 설정 */
    color: white;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 투명한 검은색 오버레이 */
    opacity: 0; /* 기본 상태에서 보이지 않음 */
    transition: opacity 0.3s ease;
    border-radius: 10px; /* 이미지와 동일한 모서리 반경 */
    z-index: 1;
  }
`;

const MoviesCategory = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <CategoryTitle>카테고리</CategoryTitle>
      <ButtonContainer>
        <CategoryButton to="/movies/now-playing">
          <img src="https://images.unsplash.com/photo-1728257471500-4bacef65a2c6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D" alt="현재 상영중" />
          <span>현재 상영중인</span>
          <div className="overlay" />
        </CategoryButton>
        <CategoryButton to="/movies/popular">
          <img src="https://images.unsplash.com/photo-1533619043865-1c2e2f32ff2f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="인기있는" />
          <span>인기있는</span>
          <div className="overlay" />
        </CategoryButton>
        <CategoryButton to="/movies/top-rated">
          <img src="https://images.unsplash.com/photo-1728231465732-427fc9a71f29?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMxfE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D" alt="높은 평가를 받은" />
          <span>높은 평가를 받은</span>
          <div className="overlay" />
        </CategoryButton>
        <CategoryButton to="/movies/upcoming">
          <img src="https://images.unsplash.com/photo-1726083218617-6b8a0000e574?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE1MXxxUFlzRHp2Sk9ZY3x8ZW58MHx8fHx8" alt="개봉 예정중인" />
          <span>개봉 예정중인</span>
          <div className="overlay" />
        </CategoryButton>
      </ButtonContainer>

      <Routes>
        <Route path="now-playing" element={<NowPlaying />} />
        <Route path="popular" element={<Popular />} />
        <Route path="top-rated" element={<TopRated />} />
        <Route path="upcoming" element={<Upcoming />} />
      </Routes>
      </Container>
  );
};

export default MoviesCategory;