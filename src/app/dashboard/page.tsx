
"use client";

import { User } from "../types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAccessToken } from "@/utils/getAccessToken";
import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import { timezoneData } from "@/constant/timezone"; 

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1'),
  getItem('Option 2', '2'),
  getItem('User', 'sub1', undefined, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', undefined, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9'),
];

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = (await res.json()) as User[];
  return users;
}

async function getUser() {
  const res = await axios({
    method: 'get',
    url: 'http://localhost:4019/api/v1/user',
    headers: { 
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${getAccessToken()}`
    },
    // data: {
    //   email,
    //   password,
    // },
  });
  return res.data;
}

export default function Dashboard() {
  const [displayModal, setDisplayModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["hydrate-users"],
    queryFn: () => getUser(),
  });
  console.log(data, getAccessToken());
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(e) => console.log(e)} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            Bill is a cat.
            <Button onClick={() => setDisplayModal(true)}>Create Course</Button>
            <Modal title="Create Course" footer={<div />} width="98vw" open={displayModal} onCancel={() => setDisplayModal(false)} onOk={(e) => console.log(e)}>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ width: 600 }}
                initialValues={{ remember: true }}
                onFinish={value => console.log(value)}
                onFinishFailed={(e) => console.log(e)}
                autoComplete="off"
              >
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[{ required: true, message: 'Please input course title!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: 'Please input course description!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Start At"
                  name="startAt"
                  rules={[{ required: true, message: 'Please input course start at!' }]}
                >
                  <DatePicker showTime/>
                </Form.Item>
                <Form.Item
                  label="End At"
                  name="endAt"
                  rules={[{ required: true, message: 'Please input course end at!' }]}
                >
                  <DatePicker showTime/>
                </Form.Item>
                <Form.Item
                  label="Timezone"
                  name="timezone"
                  rules={[{ required: true, message: 'Please input course timezone!' }]}
                >
                  <Select
                    style={{ width: 400 }}
                    options={timezoneData.map(({
                      name,
                      timezone,
                    }) => ({
                      label: name,
                      value: timezone,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  label="Link"
                  name="link"
                  rules={[{ required: true, message: 'Please input course description!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Max Num Of Teachers"
                  name="maxNumOfTeachersAllowToRegister"
                  rules={[{ required: true, message: 'Please input course description!' }]}
                >
                  <Input type="number" min={1}/>
                </Form.Item>
                <Form.Item
                  label="Max Num Of Students"
                  name="maxNumOfStudentsAllowToRegister"
                  rules={[{ required: true, message: 'Please input course description!' }]}
                >
                  <Input type="number" min={1}/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}