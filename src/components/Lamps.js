import React, { useState, useEffect } from "react";
import { request } from "../axios_helper";

const Lamps = () => {
    const [deviceId, setDeviceId] = useState('');
    const [lampData, setLampData] = useState(null);
    const [error, setError] = useState(null);
    const [updateLamp, setUpdateLamp] = useState({
        deviceId: '',
        name: '',
        newValue: 0,
    });

    useEffect(() => {
        fetchAllLamps();
    }, []);

    const fetchAllLamps = () => {
        request('GET', '/lamps', {})
            .then((response) => {
                setLampData(response.data);
                setError(null);
            })
            .catch(() => {
                setLampData(null);
                setError('Something went wrong fetching lamp data.');
            });
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setDeviceId(value);
        setError(null);
    };

    const onSubmitDeviceId = (event) => {
        event.preventDefault();
        fetchLampData(deviceId);
    };

    const fetchLampData = (deviceId) => {
        request('GET', `/lamps/${deviceId}`, {})
            .then((response) => {
                setLampData(response.data);
                setError(null);
            })
            .catch(() => {
                setLampData(null);
                setError('Something went wrong fetching lamp data.');
            });
    };








    const [newLamp, setNewLamp] = useState({
        deviceId: '',
        name: '',
        lightLevel: 0,
    });

    const onChangeNewLamp = (event) => {
        const { name, value } = event.target;
        setNewLamp({
            ...newLamp,
            [name]: name === 'lightLevel' ? parseInt(value, 10) : value,
        });
    };

    const onSubmitNewLamp = (event) => {
        event.preventDefault();
        addNewLamp(newLamp);
    };

    const addNewLamp = (newLamp) => {
        request('POST', '/lamps', newLamp)
            .then((response) => {
                setLampData(response.data);
                setNewLamp({
                    deviceId: '',
                    name: '',
                    lightLevel: 0,
                });
            })
            .catch((error) => {
                console.error('Error adding new lamp:', error);
            });
    };


    const deleteLamp = (name) => {
        request('DELETE', '/lamps', {deviceId: deviceId, name: name})
            .then((response) => {
                setLampData(response.data);
                setNewLamp({
                    deviceId: '',
                    name: '',
                    lightLevel: 0,
                });
            })
    }





    const onChangeUpdateLamp = (event) => {
        const { name, value } = event.target;
        setUpdateLamp({
            ...updateLamp,
            [name]: name === 'newValue' ? value : value,
        });
    };

    const onSubmitUpdateLamp = (event) => {
        event.preventDefault();
        updateLampInfo(updateLamp);
    };

    const updateLampInfo = (updateLamp) => {
        console.log(updateLamp);
        request('PATCH', `/lamps`, updateLamp)
            .then((response) => {
                setLampData(response.data);
                setUpdateLamp({
                    deviceId: '',
                    name: '',
                    newValue: 0,
                });
            })
            .catch((error) => {
                console.error('Error updating lamp:', error);
            });
    };

    return (
        <div className="col justify-content-center m-3">
            <div className="row justify-content-center m-3">

                <div className="col-md-4">
                    <div>
                        <h5>Get Lamp by device id:</h5>
                        <form onSubmit={onSubmitDeviceId}>
                            <div className="form-outline mb-2">
                                <input
                                    type="text"
                                    id="deviceId"
                                    name="deviceId"
                                    className="form-control form-control-sm"
                                    style={{width: "150px"}}
                                    onChange={onChangeHandler}
                                    value={deviceId}
                                    placeholder="Enter device Id"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mb-4">
                                Get lamps
                            </button>
                        </form>
                    </div>
                </div>

                <div className="col-md-4">
                    <div>
                        <h5>Add New Lamp:</h5>
                        <form onSubmit={onSubmitNewLamp}>
                            <div className="form-outline mb-2">
                                <input
                                    type="text"
                                    id="deviceId"
                                    name="deviceId"
                                    className="form-control form-control-sm"
                                    onChange={onChangeNewLamp}
                                    value={newLamp.deviceId}
                                    placeholder="Device ID"
                                />
                            </div>
                            <div className="form-outline mb-2">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control form-control-sm"
                                    onChange={onChangeNewLamp}
                                    value={newLamp.name}
                                    placeholder="Lamp Name"
                                />
                            </div>
                            <div className="form-outline mb-2">
                                <input
                                    type="number"
                                    id="lightLevel"
                                    name="lightLevel"
                                    className="form-control form-control-sm"
                                    onChange={onChangeNewLamp}
                                    value={newLamp.lightLevel}
                                    placeholder="Light Level"
                                />
                            </div>
                            <button type="submit" className="btn btn-success btn-block mb-4">
                                Add Lamp
                            </button>
                        </form>
                    </div>
                </div>

                <div className="col-md-4">
                    <div>
                        <h5>Update Lamp:</h5>
                        <form onSubmit={onSubmitUpdateLamp}>
                            <div className="form-outline mb-2">
                                <input
                                    type="text"
                                    id="updateDeviceId"
                                    name="deviceId"
                                    className="form-control form-control-sm"
                                    onChange={onChangeUpdateLamp}
                                    value={updateLamp.deviceId}
                                    placeholder="Updated Lamp Device Id"
                                />
                            </div>
                            <div className="form-outline mb-2">
                                <input
                                    type="text"
                                    id="updateName"
                                    name="name"
                                    className="form-control form-control-sm"
                                    onChange={onChangeUpdateLamp}
                                    value={updateLamp.name}
                                    placeholder="Lamp Name"
                                />
                            </div>
                            <div className="form-outline mb-2">
                                <input
                                    type="number"
                                    id="updateNewValue"
                                    name="newValue"
                                    className="form-control form-control-sm"
                                    onChange={onChangeUpdateLamp}
                                    value={updateLamp.newValue}
                                    placeholder="New Light Level"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mb-4">
                                Update Lamp
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

            {lampData && (
                <div className="col-12">
                    <h5>Lamp Data:</h5>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Light level</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lampData.map((lamp) => (
                            <tr key={lamp.id}>
                                <td>{lamp.id}</td>
                                <td>{lamp.name}</td>
                                <td>{lamp.lightLevel}</td>
                                <td>
                                    <button onClick={() => deleteLamp(lamp.name)} className={"btn btn-danger"}>
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

export default Lamps;
