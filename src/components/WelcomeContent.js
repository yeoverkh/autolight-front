import * as React from 'react';

export default function WelcomeContent(props) {
    return (
        <div className="row justify-content-md-center text-center">
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Welcome</h1>
                    <p className="lead">Login to see protected content.</p>
                </div>
            </div>
            <div className={"col-md-12"}>
                <button className={"btn btn-primary"} style={{margin: "10px"}} onClick={props.login}>Login</button>
            </div>
        </div>
    );
}