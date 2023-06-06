require("dotenv").config();
import HashStringHandler from "../utils/hashString";
import { USER_ROLE } from "../ts/enums/app_enums";
import gavatar from "gravatar";
const USER_ARRAY = [
  {
    id: "ad0cbf9e-d9e6-4204-8c86-2395073756f3",
    type: USER_ROLE.ADMIN,
    firstName: "Tuan",
    lastName: "Tran",
    email: "tuantransn2001@gmail.com",
    password: HashStringHandler.hash(process.env.ADMIN_PW as string, 10),
    avatar: gavatar.url("tuantransn2001@gmail.com"),
    status: "online",
  },
  {
    id: "068a4742-014a-11ee-be56-0242ac120002",
    type: USER_ROLE.USER,
    firstName: "Tuan 1",
    lastName: "Tran 1",
    email: "tuantransn20011@gmail.com",
    password: HashStringHandler.hash(process.env.ADMIN_PW as string, 10),
    avatar: gavatar.url("tuantransn20011@gmail.com"),
    status: "online",
  },
  {
    id: "17249756-014a-11ee-be56-0242ac120002",
    type: USER_ROLE.USER,
    firstName: "Tuan 2",
    lastName: "Tran 2",
    email: "tuantransn20012@gmail.com",
    password: HashStringHandler.hash(process.env.ADMIN_PW as string, 10),
    avatar: gavatar.url("tuantransn20012@gmail.com"),
    status: "online",
  },
  {
    id: "1cbb1f32-014a-11ee-be56-0242ac120002",
    type: USER_ROLE.USER,
    firstName: "Tuan 3",
    lastName: "Tran 3",
    email: "tuantransn20013@gmail.com",
    password: HashStringHandler.hash(process.env.ADMIN_PW as string, 10),
    avatar: gavatar.url("tuantransn20013@gmail.com"),
    status: "online",
  },
];

export { USER_ARRAY };
