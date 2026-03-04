import React from "react";

export type UserType = {
  id: number | string;
  username: string;
  email: string;
};

type UserProps = {
  user: UserType;
  onDeleteClick: (user: UserType) => void;
  onEditClick: (user: UserType) => void;
};

const User: React.FC<UserProps> = ({ user, onEditClick, onDeleteClick }) => {
  return (
    <tr>
      <td>
      <a data-bs-target="#addEmployeeModal" className="add" data-bs-toggle="modal"></a>
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
        <a className="edit" style={{ cursor : "pointer" }} onClick={() => onEditClick(user)}>
          <i
            className="material-icons"
            data-bs-toggle="tooltip"
            title="Edit"
          >
            &#xE254;
          </i>
        </a>

        <a className="delete" style={{ cursor : "pointer" }} onClick={() => onDeleteClick(user)}>
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
