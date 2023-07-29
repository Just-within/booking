import React, { useState } from 'react';
import { theme, Button, Modal, Form, Input, Select, Table, message } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRole, postRole, getPermission } from '@/api';
import { PermissionType } from '@/types';

const columns: any = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'Permissions',
    dataIndex: 'permissions',
    key: 'permissions',
    render: (value: PermissionType[]) => value?.map(p => p.name).join(', '),
  },
]

export default function RolePage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(undefined);
  const { data: roles, refetch: refetchRole } = useQuery({
    queryKey: ["role"],
    queryFn: () => getRole(),
  });
  const { data: permissions } = useQuery({
    queryKey: ["permissions"],
    queryFn: () => getPermission(),
  });
  const { mutate: postRoleFun } = useMutation<any, any, { name: string, permissions: number[] }>({
    mutationKey: ["postRole"],
    mutationFn: ({ name, permissions }) => postRole(name, permissions),
    onSuccess: () => {
      message.success('Create role successfully!!');
      refetchRole();
      setDisplayModal(false);
    },
  });

  return (
    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
      <Button style={{ marginBottom: 20 }} onClick={() => setDisplayModal(true)}>Create Role</Button>
      <Table
        rowKey="id"
        dataSource={roles}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => {
              setSelectedRole(record);
            },
          };
        }}
      />
      <Modal title="Create Role" footer={<div />} width="98vw" open={displayModal} onCancel={() => setDisplayModal(false)}>
        <Form
          name="role"
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
            rules={[{ required: true, message: 'Please input role name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Permissions"
            name="permissions"
            rules={[{ required: true, message: 'Please input role permissions!' }]}
          >
            <Select
              mode="multiple"
              style={{ width: 400 }}
              options={permissions?.map((p: any) => ({ label: p.name, value: p.id }))}
            />
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