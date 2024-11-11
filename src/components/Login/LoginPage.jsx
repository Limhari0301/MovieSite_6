// components/LlginPage.jsx
import React, { useContext } from 'react'; // React와 useContext import
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { UserContext } from '../../App';

// 스타일링을 위한 컴포넌트
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
  color: white;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #222;
  color: white;

  &::placeholder {
    color: #aaa;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  width: 320px;
  border: none;
  border-radius: 4px;
  background-color: #ff007f;
  color: white;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #e60000;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;


const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const schema = yup.object().shape({
    email: yup.string().email().required('이메일을 반드시 입력해주세요.'),
    password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required(),
  })

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: data.email,
        password: data.password
      });

      const { accessToken, refreshToken, user } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      navigate('/'); // 로그인 후 홈 페이지로 리디렉션
    } catch (error) {
      console.error("로그인 에러:", error);
    }
  };

  return (
      <Container>
          <Title>로그인</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
              <Input type='email' placeholder='이메일을 입력해주세요!' {...register("email")} />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
              <Input type='password' placeholder='비밀번호를 입력해주세요!' {...register("password")} />
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
              <SubmitButton type='submit'>로그인</SubmitButton>
          </form>
      </Container>
  );      
};

export default LoginPage;
