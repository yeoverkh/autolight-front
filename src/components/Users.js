import React, {useEffect, useState} from "react";
import {request} from "../axios_helper";
import {Link} from "react-router-dom";

export default function Users() {
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        request('GET', '/users', {})
            .then((response) => {
                setUsersData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }

    const deleteUser = (login) => {
        request('DELETE', `/users/${login}`, {})
            .then(response => {
                setUsersData(response.data);
            });
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Created At</th>
                            <th>Login</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Devices</th>
                            <th>Roles</th>
                            <th>Edit Roles</th>
                            <th>Info</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {usersData.map((userData, index) => (
                            <tr key={index}>
                                <td>{new Date(userData.createdAt).toLocaleString()}</td>
                                <td>{userData.login}</td>
                                <td>{userData.email || ''}</td>
                                <td>{userData.phone || ''}</td>
                                <td>
                                    {userData.devices.length > 0 ? (
                                        <ul className="list-unstyled">
                                            {userData.devices.map((device, deviceIndex) => (
                                                <li key={deviceIndex}>
                                                    Device ID: {device.id}, Name: {device.name}
                                                    <ul>
                                                        {device.readings.length > 0 ? (
                                                            <ul className="list-group">
                                                                {device.readings.map((reading, readingIndex) => (
                                                                    <li key={readingIndex}>
                                                                        <div>
                                                                            <strong>Reading ID:</strong> {reading.id}
                                                                        </div>
                                                                        <div>
                                                                            <strong>Name:</strong> {reading.name}, <strong>Value:</strong> {reading.value}
                                                                        </div>
                                                                        <div>
                                                                            <strong>Is
                                                                                Warning:</strong> {reading.isWarning ? 'true' : 'false'}
                                                                        </div>
                                                                        <div>
                                                                            <strong>Date and
                                                                                Time:</strong> {new Date(reading.dateTime).toLocaleString()}
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : 'No readings'}
                                                    </ul>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : 'No devices'}
                                </td>
                                <td>
                                    {userData.roles && Array.isArray(userData.roles) && (
                                        <>
                                            {userData.roles.map((role, index) => (
                                                <tr key={index}>
                                                    <td>{role}</td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </td>
                                <td>
                                    <Link to={`/edit-roles/${userData.login}`}
                                          className="btn btn-success">
                                        Edit Roles
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/users/${userData.login}`}
                                          className="btn btn-primary">
                                        Show Details
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => deleteUser(userData.login)}
                                            className={"btn btn-danger"}>Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}