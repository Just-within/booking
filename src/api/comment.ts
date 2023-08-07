import axios from "axios";
import { API_BASIC_URL, queryHeaders } from "@/constant";
import { PostCommentType } from "@/types";

export async function postComment(postData: PostCommentType) {
  const res = await axios({
    method: 'post',
    url: `${API_BASIC_URL}/comment`,
    headers: queryHeaders,
    data: {...postData},
  });
  console.log(res);
  return res.data;
}

export async function getComments() {
  const res = await axios({
    method: 'get',
    url: `${API_BASIC_URL}/comment`,
    headers: queryHeaders,
  });
  return res.data;
}
