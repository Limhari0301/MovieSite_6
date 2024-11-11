// components/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilm, FaSearch } from 'react-icons/fa';
import styled from 'styled-components';


const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SidebarButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  font-weight: bold;
  color: white;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    background: #ddd;
  }

  svg {
    margin-right: 8px;
  }
`;

const CategoryButton = styled(Link)`
  display: block;
  margin-left: 20px;
  text-decoration: none;
  color: #555;

  &:hover {
    text-decoration: underline;
  }
`;

const Sidebar = () => {

  return (
    <SidebarContainer>
      <SidebarButton as={Link} to="/search">
        <FaSearch /> 찾기
      </SidebarButton>
      <SidebarButton as={Link} to="/movies">
        <FaFilm /> 영화
      </SidebarButton>
    </SidebarContainer>
  );
};

export default Sidebar;
