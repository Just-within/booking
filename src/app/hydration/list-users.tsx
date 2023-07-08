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

async function createUser(email: string, password: string) {
  const res = await axios({
    method: 'post',
    url: 'http://localhost:4019/api/v1/user',
    headers: { 
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${getAccessToken()}`
    },
    data: {
      email,
      password,
    },
  });
  return res.data;
}

export default function ListUsers() {
  const [count, setCount] = React.useState(0);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["hydrate-users"],
    queryFn: () => getUsers(),
  });

  const { mutate } = useMutation<any, any, { email: string, password: string }>({
    mutationKey: ["h"],
    mutationFn: ({ email, password }) => createUser(email, password),
  });

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div style={{ marginBottom: "4rem", textAlign: "center" }}>
        <h4 style={{ marginBottom: 16 }}>{count}</h4>
        <button onClick={() => {
            setCount((prev) => prev + 1);
            mutate({ email: 'test2@gmail.com', password: '123' }, { onSuccess: (res) => { console.log('success', res) }, onError: (err) => console.log('onError', err) })
          }}>increment</button>
        <button
          onClick={() => setCount((prev) => prev - 1)}
          style={{ marginInline: 16 }}
        >
          decrement
        </button>
        <button onClick={() => setCount(0)}>reset</button>
      </div>

      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 20,
          }}
        >
          {data.map((user) => (
            <div
              key={user.id}
              style={{ border: "1px solid #ccc", textAlign: "center" }}
            >
              <img
                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                alt={user.name}
                style={{ height: 180, width: 180 }}
              />
              <h3>{user.name}</h3>
            </div>
          ))}
        </div>
      ) : null}
    </main>
  );
}
