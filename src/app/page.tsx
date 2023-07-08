'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button, Checkbox, Form, Input, Tabs } from 'antd';
import styled from 'styled-components';
import React from 'react';
import { useQuery, useMutation } from "@tanstack/react-query";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

async function login(email: string, password: string) {
  const res = await axios({
    method: 'post',
    url: 'http://localhost:4019/api/v1/auth/login',
    data: {
      email,
      password,
    },
  });
  return res.data;
}

async function singup(email: string, password: string) {
  const res = await axios({
    method: 'post',
    url: 'http://localhost:4019/api/v1/auth/login',
    data: {
      email,
      password,
    },
  });
  return res.data;
}

enum TabKeysEmum {
  LOGIN = 'Login',
  SIGNUP = 'Sign up',
}

export default function Home() {
  const router = useRouter();
  const { mutate: startLogin } = useMutation<any, any, { email: string, password: string }>({
    mutationKey: ["login"],
    mutationFn: ({ email, password }) => login(email, password),
    // onSuccess: e => console.log(e),
  });

  const { mutate: startSignup } = useMutation<any, any, { email: string, password: string }>({
    mutationKey: ["signup"],
    mutationFn: ({ email, password }) => singup(email, password),
    // onSuccess: e => console.log(e),
  });

  const onFinish = ({ password, email }: any, key: `${TabKeysEmum}`) => {
    // console.log('Success:', password, email);
    if (key === TabKeysEmum.LOGIN) {
      startLogin({ password, email }, { onSuccess: (e) => {
        if (window?.localStorage?.setItem) {
          window.localStorage.setItem('ACCESS_TOKEN', e.accessToken);
        }
        router.push('/dashboard');
      }, onError: (e) => console.log(e) })
    } else {
      startSignup({ password, email }, { onSuccess: (e) => console.log(e), onError: (e) => console.log(e) })
    }
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (

    <Container>
      <Tabs
        onChange={(e) => { console.log(e) }}
        type="card"
        size="large"
        items={Object.values(TabKeysEmum).map((key, i) => {
          const id = String(i + 1);
          return {
            label: key,
            key: id,
            children: (
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ width: 600 }}
                initialValues={{ remember: true }}
                onFinish={value => onFinish(value, key)}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>
                {i === 0 && <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>}
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            ),
          };
        })}
      />

    </Container>
  );
}
