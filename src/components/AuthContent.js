import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./Navbar";
import Users from "./Users";
import Lamps from "./Lamps";
import Devices from "./Devices";
import {getAuthToken} from "../axios_helper";
import {Redirect} from "react-router";
import EditRoles from "./EditRoles";
import Readings from "./Readings";
import UserDetails from "./UserDetails";

function AuthContent(props) {
    const authToken = getAuthToken();
    if (!authToken) {
        return <Redirect to="/"/>;
    }
    return (
        <div>
            <Router>
                <Navbar logout={props.logout}/>
                <div className={"container"}>
                    <Routes>
                        <Route path={"/"} exact element={<Lamps/>}/>

                        <Route path={"/readings"} element={<Readings/>}/>

                        <Route path={"/users"} element={<Users/>}/>

                        <Route path={'/users/:userLogin'} element={<UserDetails/>}/>

                        <Route path={"/devices"} element={<Devices/>}/>

                        <Route path={'/edit-roles/:userLogin'} element={<EditRoles/>}/>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default AuthContent;