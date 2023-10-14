import axios from "axios";
import { API_BASIC_URL, queryHeaders } from "@/constant";
import { PostCourseType } from "@/types";

export async function postCourse(postData: PostCourseType) {
  const res = await axios({
    method: 'post',
    url: `${API_BASIC_URL}/course`,
    headers: queryHeaders,
    data: {...postData},
  });
  return res.data;
}

export async function getCourse() {
  const res = await axios({
    method: 'get',
    url: `${API_BASIC_URL}/course`,
    headers: queryHeaders,
  });
  return res.data;
}

export async function updateCourse(id: number, updateData: PostCourseType) {
  const res = await axios({
    method: 'patch',
    url: `${API_BASIC_URL}/course/${id}`,
    headers: queryHeaders,
    data: {
      ...updateData,
    },
  });
  return res.data;
}