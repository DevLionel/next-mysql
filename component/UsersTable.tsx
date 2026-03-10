"use client";

import User from "../component/User";
import useAppContext from "@/context/useAppContext";
import type { UserType } from "@/app/types/user";

type Props = {
  checkedUserIds: number[];
  setCheckedUserIds: React.Dispatch<React.SetStateAction<number[]>>;
  onEditClick: (user: UserType) => void;
  onDeleteClick: (user: UserType) => void;
  users: UserType[];
};

function UsersTable({ users, checkedUserIds = [], setCheckedUserIds, onEditClick, onDeleteClick }: Props) {
   // Toggle "Select All" checkbox
  const toggleSelectAll = () => {
    if (checkedUserIds.length === users.length) {
      setCheckedUserIds([]);
    } else {
      setCheckedUserIds(users.map((u) => u.id));
    }
  };

  // ✅ userGenerator function keeps generating <User> rows
  const userGenerator = () => {
    return (
      <>
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            isChecked={checkedUserIds.includes(user.id)}
            setCheckedUserIds={setCheckedUserIds} // ✅ passes setter for checkbox
            onEditClick={onEditClick} 
            onDeleteClick={onDeleteClick}
          />
        ))}
      </>
    );
  };

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>
            <span className="custom-checkbox">
              <input
                type="checkbox"
                id="selectAll"
                checked={checkedUserIds.length > 0 && checkedUserIds.length === users.length}
                onChange={toggleSelectAll}
              />
              <label htmlFor="selectAll" />
            </span>
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{userGenerator()}</tbody>
    </table>
  );
}

export default UsersTable;