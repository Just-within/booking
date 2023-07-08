
"use client";

import { User } from "../types";
import { useQuery, useMutation } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/getAccessToken";

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = (await res.json()) as User[];
  return users;
}

async function getUser() {
  const res = await axios({
    method: 'get',
    url: 'http://localhost:4019/api/v1/user',
    headers: { 
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${getAccessToken()}`
    },
    // data: {
    //   email,
    //   password,
    // },
  });
  return res.data;
}

export default function Dashboard() {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["hydrate-users"],
    queryFn: () => getUser(),
  });
  console.log(data, getAccessToken());
  return (
    <div>Dashboard</div>
  );
}