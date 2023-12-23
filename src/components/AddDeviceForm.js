import React, { useState } from 'react';
import { request } from '../axios_helper';

const AddDeviceForm = () => {
    const [login, setLogin] = useState('');
    const [deviceName, setDeviceName] = useState('');

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        if (name === 'login') {
            setLogin(value);
        } else if (name === 'deviceName') {
            setDeviceName(value);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        saveNewDevice(login, deviceName);
    };

    const saveNewDevice = (login, deviceName) => {
        request('POST', `/devices`, { userLogin: login, name: deviceName })
            .then((response) => {
                console.log('Device added:', response.data);
            })
            .catch((error) => {
                console.error('Error adding device:', error);
            });
    };

    return (
        <div>
            <h5>Add a New Device:</h5>
            <form onSubmit={onSubmit}>
                <div className="form-outline mb-2">
                    <input
                        type="text"
                        id="loginName"
                        name="login"
                        className="form-control form-control-sm"
                        style={{ width: '150px' }}
                        onChange={onChangeHandler}
                        value={login}
                        placeholder="Enter user login"
                    />
                </div>
                <div className="form-outline mb-2">
                    <input
                        type="text"
                        id="deviceName"
                        name="deviceName"
                        className="form-control form-control-sm"
                        style={{ width: '150px' }}
                        onChange={onChangeHandler}
                        value={deviceName}
                        placeholder="Enter device name"
                    />
                </div>
                <button type="submit" className="btn btn-success btn-block mb-4">
                    Save New Device
                </button>
            </form>
        </div>
    );
};

export default AddDeviceForm;
