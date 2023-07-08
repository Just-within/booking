import axios from "axios";
import ListUsers from "./list-users";
import { User } from "../types";

async function getUsers() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  // console.log(res)
  // const users = (await res.json()) as User[];
  return res.data;
}

async function getUser() {
  const res = await axios({
    headers: { 
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTY4ODQzNzk3NywiZXhwIjoxNjg5NzMzOTc3fQ.b_wwBtJCD_w4cySuKHJ1AgGagOr4PH9kyAvzk9axbi4'
    },
    method: 'get',
    url: "http://localhost:4019/api/v1/user",
    // data: { email: "test1@gmail.com", password: "123" }
  });
  // console.log(res)
  return res.data;
}

export default async function InitialData() {
  const users = await getUsers();
  const user = await getUser();

  console.log(users, user);
  return <ListUsers users={users} />;
}
