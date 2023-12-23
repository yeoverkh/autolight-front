import React, { useState } from "react";

const RoleEditor = ({ userRoles, updateUserRoles }) => {
    const [selectedRole, setSelectedRole] = useState("");

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleAddRole = () => {
        if (selectedRole && !userRoles.includes(selectedRole)) {
            const updatedRoles = [...userRoles, selectedRole];
            updateUserRoles(updatedRoles);
        }
    };

    const handleRemoveRole = (role) => {
        const updatedRoles = userRoles.filter((r) => r !== role);
        updateUserRoles(updatedRoles);
    };

    return (
        <div>
            <h3>Edit User Roles</h3>
            <div>
                <select onChange={handleRoleChange} value={selectedRole}>
                    <option value="">Select Role</option>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="TECHNICIAN">TECHNICIAN</option>
                </select>
                <button onClick={handleAddRole}>Add Role</button>
            </div>
            <div>
                {userRoles.map((role) => (
                    <div key={role}>
                        {role} <button onClick={() => handleRemoveRole(role)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoleEditor;