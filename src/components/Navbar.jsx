// components/Navbar.jsx
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom'; // missing in Navbar

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #333;
  color: white;
  padding: 10px 20px;
`;

const Logo = styled.h1`
  cursor: pointer;
  color: #ff007f;
`;

const Button = styled(Link)`
  padding: 10px 15px;
  color: white;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
  

    
    useEffect(() => {
      // 로컬스토리지에서 토큰이 있을 경우 유저 정보 갱신
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
      }
    }, [setUser]);

    const handleLogout = () => {
      console.log('로그아웃 실행');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/');
    };

  
    return (
      <NavbarContainer>
        <Logo onClick={() => navigate('/')}>YONGCHA</Logo>
        <div>
          {user ? (
            <>
              <span>{user.email.split('@')[0]}님 반갑습니다.</span>
              <Button as="button" onClick={handleLogout}>로그아웃</Button>
            </>
          ) : (
            <>
              <Button to="/login">로그인</Button>
              <Button to="/signup">회원가입</Button>
            </>
          )}
        </div>
      </NavbarContainer>
    );
  };

export default Navbar;
