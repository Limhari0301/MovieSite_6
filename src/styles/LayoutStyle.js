/* styles/LayoutStyle.js */
import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 1500px;
`;

export const Main = styled.div`
  display: flex;
  flex: 1;
  width: 100%; /* 전체 너비 차지 */
`;

export const SidebarContainer = styled.div`
  width: 250px;
  background-color: #333;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #1a1a1a;
  border-radius: 10px;
  margin: 10px auto; /* 마진 제거 */
  box-sizing: border-box; /* 패딩을 너비에 포함 */
  width: 100%; /* 전체 너비 차지 */
`;

