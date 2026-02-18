import React from "react";

type UserType = {
  id: number | string;
  username: string;
  email: string;
};

type UserProps = {
  user: UserType;
};

const User: React.FC<UserProps> = ({ user }) => {
  return (
    <tr>
      <td>
        <input type="hidden" name="id" value={user.id} />

        <span className="custom-checkbox">
          <input
            type="checkbox"
            id={`data_checkbox_${user.id}`}
            className="data_checkbox"
            name="data_checkbox"
            value={user.id}
          />
          <label htmlFor={`data_checkbox_${user.id}`} />
        </span>
      </td>

      <td>{user.username}</td>
      <td>{user.email}</td>

      <td>
        <a href="#editEmployeeModal" className="edit" data-toggle="modal">
          <i
            className="material-icons"
            data-toggle="tooltip"
            title="Edit"
          >
            &#xE254;
          </i>
        </a>

        <a href="#deleteEmployeeModal" className="delete" data-toggle="modal">
          <i
            className="material-icons"
            data-toggle="tooltip"
            title="Delete"
          >
            &#xE872;
          </i>
        </a>
      </td>
    </tr>
  );
};

export default User;
