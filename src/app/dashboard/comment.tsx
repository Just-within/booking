import React, { useState } from 'react';
import { theme, Button, Modal, Form, Input, Table, message } from 'antd';
import { useMutation, useQuery, QueryCache } from '@tanstack/react-query';
import { getCourse, getComments, postComment } from '@/api';
import { CourseType, PostCommentType } from '@/types';

const queryCache = new QueryCache();

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
]

const bookingColumns = [
  {
    title: 'Course Title',
    dataIndex: 'course',
    key: 'course',
    render: (course: CourseType) => {
      return <a href={course?.link} target="_blank">{course?.title}</a>
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

export default function CommentPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedCourse, setSelectedCourse] = useState<any>(undefined);
  const users = queryCache.find(['users']);
  const { data: comments, refetch: refetchComments } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(),
  });
  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourse(),
  });
  const { mutate: postBookFun } = useMutation<any, any, PostCommentType>({
    mutationKey: ["postComment"],
    mutationFn: (value) => postComment(value),
    onSuccess: () => {
      message.success('Post comment successfully!!');
      refetchComments();
      setSelectedCourse(undefined);
    },
  });

  return (
    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
      <div>Comments</div>
      <Table
        rowKey="id"
        dataSource={comments}
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
              setSelectedCourse(record);
            },
          };
        }}
      />
      <Modal title="Create Comment" footer={<div />} width="98vw" open={Boolean(selectedCourse)} onCancel={() => setSelectedCourse(undefined)}>
        <Form
          name="comment"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 600 }}
          initialValues={{ courseId: selectedCourse?.id, userId: 5 }}
          onFinish={value => postBookFun(value)}
          onFinishFailed={(e) => console.log(e)}
          autoComplete="off"
        >
          <Form.Item
            label="Course Name"
            name="courseId"
            // rules={[{ required: true, message: 'Please input course name!' }]}
          >
            <div>{selectedCourse?.title}</div>
            <Input style={{ display: 'none' }} />
          </Form.Item>
          <Form.Item
            label="User Name"
            name="userId"
            // rules={[{ required: true, message: 'Please input course name!' }]}
          >
            <div>{selectedCourse?.title}</div>
            <Input style={{ display: 'none' }} />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
          >
            <Input.TextArea />
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