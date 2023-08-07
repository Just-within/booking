import React, { useState } from 'react';
import { theme, Button, Modal, Form, Input, Table, message, Checkbox } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCourse, getBooking, postBooking } from '@/api';
import { PostBookingType, CourseType, BookingType } from '@/types';

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

export default function BookingPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedRole, setSelectedRole] = useState<any>(undefined);
  const { data: bookings, refetch: refetchBooking } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(),
  });
  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourse(),
  });
  const { mutate: postBookFun } = useMutation<any, any, PostBookingType>({
    mutationKey: ["postBooking"],
    mutationFn: (value) => postBooking(value),
    onSuccess: () => {
      message.success('Booking successfully!!');
      refetchBooking();
      setSelectedRole(undefined);
    },
  });

  return (
    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
      <div>Bookings</div>
      <Table
        rowKey="id"
        dataSource={bookings}
        columns={bookingColumns}
      />
      <div>Courses</div>
      <Table
        rowKey="id"
        dataSource={courses}
        columns={courseColumns}
        onRow={(record) => {
          return {
            onClick: () => {
              setSelectedRole(record);
            },
          };
        }}
      />
      <Modal title="Create Booking" footer={<div />} width="98vw" open={Boolean(selectedRole)} onCancel={() => setSelectedRole(undefined)}>
        <Form
          name="permission"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 600 }}
          initialValues={{ courseId: selectedRole?.id, isStudent: true }}
          onFinish={value => postBookFun(value)}
          onFinishFailed={(e) => console.log(e)}
          autoComplete="off"
        >
          <Form.Item
            label="Course Name"
            name="courseId"
            rules={[{ required: true, message: 'Please input course name!' }]}
          >
            <div>{selectedRole?.title}</div>
            <Input style={{ display: 'none' }} />
          </Form.Item>
          <Form.Item
            label="IsStudent"
            name="isStudent"
          >
            <Checkbox />
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