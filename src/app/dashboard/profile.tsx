import React, { useState } from 'react';
import { theme, Button, Modal, Form, Input, Table, Select } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCourse, getBooking, postBooking, getUsers } from '@/api';
import { PostBookingType, CourseType, BookingType } from '@/types';
import { timezoneData } from "@/constant";

const courseColumns: any = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
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
    title: 'Student Count',
    dataIndex: 'booking',
    key: 'booking',
    render: (value: BookingType[]) => {
      return value.filter(b => b.isStudent).length ?? 0;
    }
  },
  {
    title: 'Teacher Count',
    dataIndex: 'booking',
    key: 'booking',
    render: (value: BookingType[]) => {
      return value.filter(b => !b.isStudent).length ?? 0;
    }
  }
]

const bookingColumns = [
  {
    title: 'Course Title',
    dataIndex: 'course',
    key: 'course',
    render: (course: CourseType) => {
      return <a href={course.link} target="_blank">{course.title}</a>
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Role',
    dataIndex: 'isStudent',
    key: 'isStudent',
    render: (value: boolean) => value ? 'Student' : 'Teacher'
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
]

export default function ProfilePage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(undefined);
  const { data: users, refetch: refetchBooking } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
  // const { data: courses } = useQuery({
  //   queryKey: ["courses"],
  //   queryFn: () => getCourse(),
  // });
  // const { mutate: postBookFun } = useMutation<any, any, PostBookingType>({
  //   mutationKey: ["postBooking"],
  //   mutationFn: (value) => postBooking(value),
  //   onSuccess: () => {
  //     message.success('Booking successfully!!');
  //     refetchBooking();
  //     setSelectedRole(undefined);
  //   },
  // });

  return (
    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
      <div>Profile</div>
      <Button style={{ marginBottom: 20 }} onClick={() => setDisplayModal(true)}>Create Permission</Button>
      <Table
        rowKey="id"
        dataSource={users}
        columns={bookingColumns}
      />
      <div>Users</div>
      <Table
        rowKey="id"
        dataSource={users}
        columns={courseColumns}
        onRow={(record) => {
          return {
            onClick: () => {
              setSelectedRole(record);
            },
          };
        }}
      />
      <Modal title="Upload profile" footer={<div />} width="98vw" open={displayModal} onCancel={() => setSelectedRole(undefined)}>
        <Form
          name="permission"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 600 }}
          initialValues={{ courseId: selectedRole?.id, isStudent: true }}
          onFinish={value => console.log(value)}
          onFinishFailed={(e) => console.log(e)}
          autoComplete="off"
        >
          <Form.Item
            label="firstName"
            name="firstName"
            rules={[{ required: true, message: 'Please input course name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="middleName"
            name="middleName"
            // rules={[{ required: true, message: 'Please input course name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="lastName"
            name="lastName"
            rules={[{ required: true, message: 'Please input course name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="TimeZone"
            name="timeZone"
            rules={[{ required: true, message: 'Please input course name!' }]}
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