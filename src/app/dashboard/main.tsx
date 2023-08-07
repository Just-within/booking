import React, { useState } from 'react';
import { theme, Button, Modal, Form, Input, DatePicker, Select, message, Table } from 'antd';
import { timezoneData } from "@/constant";
import { useMutation, useQuery } from '@tanstack/react-query';
import { PostCourseType, CourseLevelEnum, PermissionType } from '@/types';
import { getPermission, postCourse, getCourse } from '@/api';

const columns: any = [
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
    title: 'TimeZone',
    dataIndex: 'timeZone',
    key: 'timeZone',
  },
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
  },
  {
    title: 'Link',
    dataIndex: 'link',
    key: 'link',
  },
  {
    title: 'Start At',
    dataIndex: 'startAt',
    key: 'startAt',
  },
  {
    title: 'End At',
    dataIndex: 'endAt',
    key: 'endAt',
  },
  {
    title: 'Max Student',
    dataIndex: 'maxNumOfStudentsAllowToRegister',
    key: 'maxNumOfStudentsAllowToRegister',
  },
  {
    title: 'Max Teacher',
    dataIndex: 'maxNumOfTeachersAllowToRegister',
    key: 'maxNumOfTeachersAllowToRegister',
  },
  {
    title: 'Student Eligibility',
    dataIndex: 'studentEligibilityForCourseSelection',
    key: 'studentEligibilityForCourseSelection',
    render: (value: PermissionType[]) => value?.map(p => p.name).join(', '),
  },
  {
    title: 'Teacher Eligibility',
    dataIndex: 'teacherEligibilityForCourseSelection',
    key: 'teacherEligibilityForCourseSelection',
    render: (value: PermissionType[]) => value?.map(p => p.name).join(', '),
  },
]

export default function Main() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [displayModal, setDisplayModal] = useState(false);
  const { data: courses, refetch: refetchCourse } = useQuery({
    queryKey: ["course"],
    queryFn: () => getCourse(),
  });
  const { mutate: postRoleFun } = useMutation<any, any, PostCourseType>({
    mutationKey: ["postCourse"],
    mutationFn: (data) => postCourse(data),
    onSuccess: () => {
      message.success('Create role successfully!!');
      refetchCourse();
      setDisplayModal(false);
    },
  });
  const { data: permissions, } = useQuery({
    queryKey: ["role"],
    queryFn: () => getPermission(),
  });
  return (
    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
      <Button style={{ marginBottom: 20 }} onClick={() => setDisplayModal(true)}>Create Course</Button>
      <Table
        rowKey="id"
        dataSource={courses}
        columns={columns}
        // onRow={(record) => {
        //   return {
        //     onClick: () => {
        //       setSelectedRole(record);
        //     },
        //   };
        // }}
      />
      <Modal title="Create Course" footer={<div />} width="98vw" open={displayModal} onCancel={() => setDisplayModal(false)} onOk={(e) => console.log(e)}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 600 }}
          initialValues={{ remember: true }}
          onFinish={value => postRoleFun(value)}
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
            label="Level"
            name="level"
            rules={[{ required: true, message: 'Please input course level!' }]}
          >
            <Select
              style={{ width: 400 }}
              options={Object.values(CourseLevelEnum).map((level) => ({
                label: level,
                value: level,
              }))}
            />
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
            name="timeZone"
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
          <Form.Item
            label="Teacher Eligibility For Course Selection"
            name="teacherEligibilityForCourseSelectionId"
          >
            <Select
              mode="multiple"
              style={{ width: 400 }}
              options={permissions?.map((p: any) => ({ label: p.name, value: p.id }))}
            />
          </Form.Item>
          <Form.Item
            label="Student Eligibility For Course Selection"
            name="studentEligibilityForCourseSelectionId"
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
  )
}