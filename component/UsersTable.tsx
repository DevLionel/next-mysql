import User from "../component/User";
import type { UserType } from "../component/User";

type Props = {
  users: UserType[];
  onDeleteClick: (user: UserType) => void;
  onEditClick: (user: UserType) => void;
};

function UsersTable({ users, onEditClick, onDeleteClick }: Props) {

  const userGenerator = () => {
    return (
      <>
        {users.map(user => {
          return (
            <User 
              key={user.id} 
              user={user} 
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
                <input type="checkbox" id="selectAll" />
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