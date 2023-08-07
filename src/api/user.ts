import axios from "axios";
import { API_BASIC_URL, queryHeaders } from "@/constant";
import { PostCourseType } from "@/types";

export async function postUser(postData: PostCourseType) {
  const res = await axios({
    method: 'post',
    url: `${API_BASIC_URL}/user`,
    headers: queryHeaders,
    data: {...postData},
  });
  return res.data;
}

export async function getUsers() {
  const res = await axios({
    method: 'get',
    url: `${API_BASIC_URL}/user`,
    headers: queryHeaders,
  });
  return res.data;
}