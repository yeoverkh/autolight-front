import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {request} from "../axios_helper";

const UserDetails = () => {
    const { userLogin } = useParams();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        request('GET', `/users/${userLogin}`, {})
            .then(response => {
                setUserDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    }, [userLogin]);

    if (!userDetails) {
        return <div>User not exists</div>;
    }

    return (
        <div>
            <h2>User Details</h2>
            <p><strong>Login:</strong> {userDetails.login}</p>
            <p><strong>Created at:</strong> {new Date(userDetails.createdAt).toLocaleString() }</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>
            <h3>Devices</h3>
            {userDetails.devices.length > 0 ? (
                <ul>
                    {userDetails.devices.map(device => (
                        <li key={device.id}>
                            <p><strong>Name:</strong> {device.name}</p>
                            <h4>Readings</h4>
                            {device.readings.length > 0 ? (
                                <ul>
                                    {device.readings.map(reading => (
                                        <li key={reading.id}>
                                            <p><strong>Name:</strong> {reading.name}</p>
                                            <p><strong>Value:</strong> {reading.value}</p>
                                            <p><strong>Date:</strong> {new Date(reading.dateTime).toLocaleString()}</p>
                                            <p><strong>Warning:</strong> {reading.isWarning ? 'Yes' : 'No'}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No readings available for this device.</p>
                            )}
                            <h4>Lamps</h4>
                            {device.lamps.length > 0 ? (
                                <ul>
                                    {device.lamps.map(lamp => (
                                        <li key={lamp.id}>
                                            <p><strong>Name:</strong> {lamp.name}</p>
                                            <p><strong>Light Level:</strong> {lamp.lightLevel}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No lamps available for this device.</p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No devices available for this user.</p>
            )}
        </div>
    );
};

export default UserDetails;