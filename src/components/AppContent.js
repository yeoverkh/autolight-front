import * as React from 'react';
import WelcomeContent from "./WelcomeContent";
import AuthContent from "./AuthContent";
import LoginForm from "./LoginForm";
import {getAuthToken, removeAuthToken, request, setAuthToken} from "../axios_helper";

export default class AppContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentToShow: getAuthToken() ? "app" : "welcome"
        }
    }

    login = () => {
        this.setState({componentToShow: "login"})
    }

    logout = () => {
        this.setState({componentToShow: "welcome"})
        removeAuthToken();
    }

    onLogin = (e, login, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            {login: login, password: password})
            .then((response) => {
                this.setState({componentToShow: "app"});
                setAuthToken(response.data.token);
            }).catch((error) => {
            this.setState({componentToShow: "welcome"});
        });
    }

    onRegister = (e, login, password) => {
        e.preventDefault();
        request(
            "POST",
            "/register",
            {login: login, password: password})
            .then((response) => {
                this.setState({componentToShow: "app"});
                setAuthToken(response.data.token);
            }).catch((error) => {
            this.setState({componentToShow: "welcome"});
        });
    }

    render() {
        return (
                <div className="container mt-3">
                    {this.state.componentToShow === 'welcome' && (
                        <WelcomeContent login={this.login} />
                    )}
                    {this.state.componentToShow === 'app' && (
                        <AuthContent logout={this.logout} />
                    )}
                    {this.state.componentToShow === 'login' && (
                        <LoginForm
                            onLogin={this.onLogin}
                            onRegister={this.onRegister}
                        />
                    )}
                </div>
        );
    }
}