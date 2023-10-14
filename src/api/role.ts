import axios from 'axios';
import { API_BASIC_URL, queryHeaders } from '@/constant';

export async function getRole() {
  const res = await axios({
    method: 'get',
    url: `${API_BASIC_URL}/role`,
    headers: queryHeaders,
  });
  return res.data;
}

export async function postRole(name: string, permissions: number[]) {
  const res = await axios({
    method: 'post',
    url: `${API_BASIC_URL}/role`,
    headers: queryHeaders,
    data: {
      name,
      permissions,
    },
  });
  return res.data;
}

export async function updateRole(id: number, name: string, permissions: number[]) {
  const res = await axios({
    method: 'patch',
    url: `${API_BASIC_URL}/role/${id}`,
    headers: queryHeaders,
    data: {
      name,
      permissions,
    },
  });
  return res.data;
}

export async function deleteRole(id: number) {
  const res = await axios({
    method: 'delete',
    url: `${API_BASIC_URL}/role/${id}`,
    headers: queryHeaders,
  });
  return res.data;
}