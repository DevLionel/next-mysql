import User from "../component/User";
import type { UserType } from "../component/User";

type Props = {
  users: UserType[];
  onDeleteClick: (user: UserType) => void;
  onEditClick: (user: UserType) => void;
  checkedUserIds: number[];
  setCheckedUserIds: React.Dispatch<React.SetStateAction<number[]>>; 
};

function UsersTable({ users = [], onEditClick, onDeleteClick, checkedUserIds = [], setCheckedUserIds }: Props) {

  const toggleUser = (userId: number) => {
    if (checkedUserIds.includes(userId)) {
      setCheckedUserIds(prev => prev.filter(id => id !== userId));
    } else {
      setCheckedUserIds(prev => [...prev, userId]);
    }
  };

  const toggleSelectAll = () => {
    if (checkedUserIds.length === users.length) {
      setCheckedUserIds([]);
    } else {
      setCheckedUserIds(users.map(u => Number(u.id)));
    }
  };

  const userGenerator = () => {
    return (
      <>
        {users.map(user => {
          return (
            <User 
              key={user.id} 
              user={user} 
              isChecked={checkedUserIds.includes(user.id)}
              onCheckboxChange={() => toggleUser(user.id)}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          );
        })}
      </>
    );
  };

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>
              <span className="custom-checkbox">
                <input type="checkbox" id="selectAll"
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
        <tbody>
          {userGenerator()}
        </tbody>
      </table>
    </>
  );
}

export default UsersTable;