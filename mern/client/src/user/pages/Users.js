import React from "react";
//component
import UsersList from "../components/UsersList";

const Users = () => {
  const USER = [
    {
      id: "p1",
      image: "https://i.pinimg.com/474x/7c/4d/15/7c4d1533480bb4c5911d95699fef5186.jpg",
      name: "cat1",
      placeCount: "2",
    },
    {
      id: "p2",
      image: "https://i.pinimg.com/474x/7c/4d/15/7c4d1533480bb4c5911d95699fef5186.jpg",
      name: "cat2",
      placeCount: "3",
    },
  ];
  return <UsersList items={USER} />;
};

export default Users;
