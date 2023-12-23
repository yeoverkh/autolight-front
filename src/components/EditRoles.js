import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {request} from "../axios_helper";

const EditRoles = () => {
    const {userLogin} = useParams();
    const [rolesData, setRolesData] = useState([]);
    const [newRole, setNewRole] = useState("");

    useEffect(() => {
        request('GET', `/users/${userLogin}/roles`, {})
            .then((response) => {
                setRolesData(response.data);
                console.log(rolesData);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const addRole = () => {
        request('POST', `/users/${userLogin}/roles`, newRole)
            .then(response => {
                setRolesData(response.data);
            })
    }

    const deleteRole = (role) => {
        request('DELETE', `/users/${userLogin}/roles`, role)
            .then(response => {
                setRolesData(response.data);
            })
    }

    return (
        <div className={"row text-start my-5"}>
            <h4>Editing roles for user: {userLogin}</h4>
            <div>
                <input
                    type="text"
                    placeholder="Enter new role"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                />
                <button onClick={addRole} className="btn btn-primary">Add Role</button>
            </div>
            {rolesData.length > 0 ? (
                <div className="col-2">
                    <h5>User Roles:</h5>
                    <table className={"table"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Name</th>
                            <th scope={"col"}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rolesData.map((role, index) => (
                            <tr key={`${role.name}-${index}`}>
                                <td>{role}</td>
                                <td>
                                    <button onClick={() => deleteRole(role)}
                                            className={"btn btn-danger"}>Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : <h5>No roles</h5>}
        </div>
    );
};

export default EditRoles;