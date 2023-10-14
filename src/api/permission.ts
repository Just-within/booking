import axios from 'axios';
import { API_BASIC_URL, queryHeaders } from '@/constant';

export async function getPermission() {
  const res = await axios({
    method: 'get',
    url: `${API_BASIC_URL}/permission`,
    headers: queryHeaders,
  });
  return res.data;
}

export async function postPermission(name: string, description: string) {
  const res = await axios({
    method: 'post',
    url: `${API_BASIC_URL}/permission`,
    headers: queryHeaders,
    data: {
      name,
      description,
    },
  });
  return res.data;
}

export async function updatePermission(id: number, name: string, description: string) {
  const res = await axios({
    method: 'patch',
    url: `${API_BASIC_URL}/permission/${id}`,
    headers: queryHeaders,
    data: {
      name,
      description,
    },
  });
  return res.data;
}

export async function deletePermission(id: number) {
  const res = await axios({
    method: 'delete',
    url: `${API_BASIC_URL}/permission/${id}`,
    headers: queryHeaders,
  });
  return res.data;
}