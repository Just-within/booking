import axios from "axios";
import { API_BASIC_URL } from "@/constant";
import { PostCourseType } from "@/types";

export async function postCourse(postData: PostCourseType) {
  const res = await axios({
    method: 'post',
    url: `${API_BASIC_URL}/course`,
    data: {...postData},
  });
  return res.data;
}

