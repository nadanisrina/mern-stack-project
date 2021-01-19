import React from "react";
import "./UsersList.css";

import UserItem from "./UsersItem";
import Card from "../../shared/components/UIElements/Card/Card";
import "./UsersItem.css";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Users Found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <div className="center">
      <ul className="user-list">
        {props.items.map((user) => (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.placeCount}
          />
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
