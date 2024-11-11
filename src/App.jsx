import React, { createContext, useEffect, useState } from 'react'; // React와 Hooks import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Navbar from './components/Navbar';
import LoginPage from './components/Login/LoginPage'; // LoginPage 컴포넌트 추가
import SignUpPage from './components/SignUp/SignUpPage'; // SignUpPage 컴포넌트 추가
import Sidebar from './components/Sidebar';
import MoviesPage from './components/Movie/MoviesPage';
import NowPlaying from './components/Movie/Category/NowPlaying';
import Popular from './components/Movie/Category/Popular';
import TopRated from './components/Movie/Category/TopRated';
import Upcoming from './components/Movie/Category/Upcoming';
import MovieDetail from './components/Movie/MovieDetail'; // MovieDetail 컴포넌트 추가
import SearchPage from './components/Search/SearchPage';  // 추가된 SearchPage 임포트
import { Layout, Main, SidebarContainer, Content } from './styles/LayoutStyle';

export const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(null);

  // 로컬 스토리지에서 토큰을 확인하여 사용자 정보 업데이트
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {setUser(storedUser);}
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <GlobalStyle />
        <Layout>
          <Navbar />
          <Main>
            <SidebarContainer>
              <Sidebar />
            </SidebarContainer>
            <Content>
              <Routes>
                <Route path="/" element={<h1>홈페이지</h1>} />
                <Route path="/login" element={<LoginPage />} /> {/* LoginPage 추가 */}
                <Route path="/signup" element={<SignUpPage />} /> {/* SignUpPage 추가 */}
                <Route path="/search" element={<SearchPage />} /> {/* SearchPage 라우트 추가 */}
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/movies/now-playing" element={<NowPlaying />} />
                <Route path="/movies/popular" element={<Popular />} />
                <Route path="/movies/top-rated" element={<TopRated />} />
                <Route path="/movies/upcoming" element={<Upcoming />} />
                <Route path="/movies/:movieId" element={<MovieDetail />} /> {/* 상세 페이지 라우트 추가 */}
              </Routes>
            </Content>
          </Main>
        </Layout>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
