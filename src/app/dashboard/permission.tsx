// import axios from 'axios';
import React, { useState } from 'react';
import { theme, Button, Modal, Form, Input, Table, message } from 'antd';
// import { getAccessToken } from '@/utils/getAccessToken';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getPermission, postPermission } from '@/api';

// async function getPermission() {
//   const res = await axios({
//     method: 'get',
//     url: 'http://localhost:4019/api/v1/permission',
//     headers: { 
//       'Access-Control-Allow-Origin': '*',
//       Authorization: `Bearer ${getAccessToken()}`
//     },
//   });
//   return res.data;
// }

// async function postPermission(name: string, description: string) {
//   const res = await axios({
//     method: 'post',
//     url: 'http://localhost:4019/api/v1/permission',
//     headers: { 
//       'Access-Control-Allow-Origin': '*',
//       Authorization: `Bearer ${getAccessToken()}`
//     },
//     data: {
//       name,
//       description,
//     },
//   });
//   return res.data;
// }

const columns: any = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
]

export default function PermissionPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(undefined);
  const { data, refetch: refetchPermission } = useQuery({
    queryKey: ["permission"],
    queryFn: () => getPermission(),
  });
  const { mutate: postRoleFun } = useMutation<any, any, { name: string, description: string }>({
    mutationKey: ["postPermission"],
    mutationFn: ({ name, description }) => postPermission(name, description),
    onSuccess: () => {
      message.success('Create permission successfully!!');
      refetchPermission();
      setDisplayModal(false);
    },
  });

  return (
    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
      <Button style={{ marginBottom: 20 }} onClick={() => setDisplayModal(true)}>Create Permission</Button>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => {
              setSelectedRole(record);
            },
          };
        }}
      />
      <Modal title="Create Permission" footer={<div />} width="98vw" open={displayModal} onCancel={() => setDisplayModal(false)}>
        <Form
          name="permission"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 600 }}
          initialValues={{ remember: true }}
          onFinish={value => postRoleFun(value)}
          onFinishFailed={(e) => console.log(e)}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input course name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}