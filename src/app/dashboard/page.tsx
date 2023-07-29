
"use client";

import { User } from "../types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAccessToken } from "@/utils/getAccessToken";
import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import { timezoneData } from "@/constant/timezone"; 
import Main from "./main";
import RolePage from "./role";
import PermissionPage from "./permission";

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
  getItem('Course', '1'),
  getItem('Role', '2'),
  getItem('Permission', '10'),
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
  });
  return res.data;
}

export default function Dashboard() {
  const [displayModal, setDisplayModal] = useState(false);
  const [activeKey, setActiveKey] = useState('1')
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["hydrate-users"],
    queryFn: () => getUser(),
  });
  console.log(activeKey);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" activeKey={activeKey} defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(e) => setActiveKey(e.key)} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          {activeKey === '1' && <Main />}
          {activeKey === '2' && <RolePage />}
          {activeKey === '10' && <PermissionPage />}
          {/* {activeKey !== '1' && <div>{activeKey}</div>} */}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}