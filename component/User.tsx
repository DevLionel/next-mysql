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
      <a data-bs-target="#addEmployeeModel" className="add" data-bs-toggle="modal"></a>
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
        <a data-bs-target="#editEmployeeModal" className="edit" data-bs-toggle="modal">
          <i
            className="material-icons"
            data-bs-toggle="tooltip"
            title="Edit"
          >
            &#xE254;
          </i>
        </a>

        <a data-bs-target="#deleteEmployeeModal" className="delete" data-bs-toggle="modal">
          <i
            className="material-icons"
            data-bs-toggle="tooltip"
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
