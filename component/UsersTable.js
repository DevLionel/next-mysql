import User from "./User";

function UsersTable({users}){

const userGenerator = () => {
	return (
		<>
			{
				users.map(user => {
					return (
						<User key = {user.id} user = {user} />
					)
				})
			}
		</>
	)
}

    return(
        <>
            <table className="table table-striped table-hover">
				<thead>
					<tr>
						<th>
							<span className="custom-checkbox">
								<input type="checkbox" id="selectAll"/>
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
    )
}

export default UsersTable;