// components/SignUpPage.jsx
import React, { useContext } from 'react'; // React와 useContext import
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { UserContext } from '../../App';

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

const SignUpPage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email('유효한 이메일 형식이 아닙니다.').required('이메일을 반드시 입력해주세요.'),
    password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required('비밀번호를 입력해주세요.'),
    passwordCheck: yup.string().oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.').required('비밀번호 확인을 입력해주세요.'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        email: data.email,
        password: data.password,
        passwordCheck: data.passwordCheck
      });

      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/login'); // 회원가입 후 로그인 페이지로 리디렉션
    } catch (error) {
      console.error("회원가입 에러:", error);
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" placeholder="이메일을 입력해주세요!" {...register("email")} />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <Input type="password" placeholder="비밀번호를 입력해주세요!" {...register("password")} />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <Input type="password" placeholder="비밀번호를 다시 입력해주세요!" {...register("passwordCheck")} />
        <ErrorMessage>{errors.passwordCheck?.message}</ErrorMessage>
        <SubmitButton type="submit">제출</SubmitButton>
      </form>
    </Container>
  );
};

export default SignUpPage;
