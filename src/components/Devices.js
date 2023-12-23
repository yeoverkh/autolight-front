import React, {useState} from "react";
import {request} from "../axios_helper";

const Devices = () => {
    const [login, setLogin] = useState('');
    const [devicesData, setDevicesData] = useState(null);
    const [error, setError] = useState(null);
    const [deviceName, setDeviceName] = useState('');

    const onChangeHandler = (event) => {
        const {name, value} = event.target;
        if (name === 'login') {
            setLogin(value);
        } else if (name === 'deviceName') {
            setDeviceName(value);
        }
        setError(null);
    };

    const onSubmitUserLogin = (event) => {
        event.preventDefault();
        fetchDevicesData(login);
    };

    const fetchDevicesData = (login) => {
        request('GET', `/devices/${login}`, {})
            .then((response) => {
                setDevicesData(response.data);
                setError(null);
            })
            .catch(() => {
                setDevicesData(null);
                setError('Something went wrong fetching devices.');
            });
    };

    const deleteDevice = (deviceName) => {
        request('DELETE', `/devices`, {userLogin: login, name: deviceName})
            .then((response) => {
                setDevicesData(response.data);
                setError(null);
            })
            .catch(() => {
                setDevicesData(null);
                setError('Something went wrong fetching devices.');
            });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        saveNewDevice(login, deviceName);
    }

    const saveNewDevice = (login, deviceName) => {
        request('POST', `/devices`, {userLogin: login, name: deviceName})
            .then((response) => {
                fetchDevicesData(login)
            })
            .catch((error) => {
                console.error('Error adding device:', error);
            });
    };

    return (
        <div className="col justify-content-center m-3">
            <div className="row justify-content-center m-3">
                <div className="col-md-6">
                    <div>
                        <h5>Get devices by user login:</h5>
                        <form onSubmit={onSubmitUserLogin}>
                            <div className="form-outline mb-2">
                                <input
                                    type="text"
                                    id="loginName"
                                    name="login"
                                    className="form-control form-control-sm"
                                    style={{width: "150px"}}
                                    onChange={onChangeHandler}
                                    value={login}
                                    placeholder="Enter user login"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mb-4">
                                Get devices
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-6">
                    <div>
                        <h5>Add a New Device:</h5>
                        <form onSubmit={onSubmit}>
                            <div className="form-outline mb-2">
                                <input
                                    type="text"
                                    id="deviceName"
                                    name="deviceName"
                                    className="form-control form-control-sm"
                                    style={{width: '150px'}}
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
                </div>
            </div>


            {error && (
                <div className="col-8">
                    <p className="text-danger">{error}</p>
                </div>
            )}

            {devicesData && (
                <div className="col-12">
                    <h5>Devices List:</h5>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Readings</th>
                            <th scope="col">Lamps</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {devicesData.map((device) => (
                            <tr key={device.id}>
                                <td>{device.id}</td>
                                <td>{device.name}</td>
                                <td>
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
                                </td>
                                <td>
                                    {device.lamps.length > 0 ? (
                                        <ul className="list-bulleted">
                                            {device.lamps.map((lamp, lampIndex) => (
                                                <li key={lampIndex}>
                                                    Lamp Id: {lamp.id}, Name: {lamp.name},
                                                    Light Level: {lamp.lightLevel}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : 'No readings'}
                                </td>
                                <td>
                                    <button onClick={() => deleteDevice(device.name)} className={"btn btn-danger"}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Devices;
