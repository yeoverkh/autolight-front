import React from "react";

export default function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
                Autolight
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">
                            Lamps
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/readings">
                            Readings
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/devices">
                            Devices
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/users">
                            Users
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={props.logout}>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}