import React, { useState } from 'react';
import { theme, Button, Modal, Form, Input, Table, message } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getPermission, postPermission, updatePermission, deletePermission } from '@/api';

export default function PermissionPage() {
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const { data, refetch: refetchPermission } = useQuery({
    queryKey: ["permission"],
    queryFn: () => getPermission(),
  });
  const { mutate: postPermissionFun } = useMutation<any, any, { name: string, description: string }>({
    mutationKey: ["postPermission"],
    mutationFn: ({ name, description }) => postPermission(name, description),
    onSuccess: () => {
      message.success('Create permission successfully!!');
      refetchPermission();
      setDisplayModal(false);
      form.resetFields();
    },
  });
  const { mutate: updatePermissionFun } = useMutation<any, any, { id: number, name: string, description: string }>({
    mutationKey: ["updatePermission"],
    mutationFn: ({ id, name, description }) => updatePermission(id, name, description),
    onSuccess: () => {
      message.success('Update permission successfully!!');
      refetchPermission();
      setDisplayModal(false);
      form.resetFields();
    },
  });

  const { mutate: deletePermissionFun } = useMutation<any, any, { id: number }>({
    mutationKey: ["deletePermission"],
    mutationFn: ({ id }) => deletePermission(id),
    onSuccess: () => {
      message.success('Delete permission successfully!!');
      refetchPermission();
    },
  });

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
    {
      title: '',
      dataIndex: '',
      key: 'id',
      render: (data: any) => {
        return <div onClick={e => e.stopPropagation()}><Button onClick={() => deletePermissionFun({ id: data?.id })}>Delete</Button></div>
      },
    }
  ]

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
              setDisplayModal(true);
              form.setFieldsValue(record);
              setSelectedId(record?.id);
            },
          };
        }}
      />
      <Modal
        title="Create Permission"
        footer={<div />}
        width="98vw"
        open={displayModal}
        onCancel={() => {
          setDisplayModal(false);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          name="permission"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 600 }}
          initialValues={{ remember: true }}
          onFinish={value => {
            if (selectedId) {
              updatePermissionFun({ id: selectedId, ...value, })
            } else {
              postPermissionFun(value);
            }
          }}
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