import axios from "axios";
import { API_BASIC_URL, queryHeaders } from "@/constant";
import { PostBookingType } from "@/types";

export async function postBooking(postData: PostBookingType) {
  const res = await axios({
    method: 'post',
    url: `${API_BASIC_URL}/booking`,
    headers: queryHeaders,
    data: {...postData},
  });
  console.log(res);
  return res.data;
}

export async function getBooking() {
  const res = await axios({
    method: 'get',
    url: `${API_BASIC_URL}/booking`,
    headers: queryHeaders,
  });
  return res.data;
}
