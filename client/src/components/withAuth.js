import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }

        componentDidMount() {
            axios({
                baseURL: "http://localhost:3001",
                url: "/checktoken",
                headers: {
                    token: Cookies.get('token')
                },
                method: "GET",
            }).then(res => {
                if (res.status === 200) {
                    this.setState({ loading: false });
                } else {
                    Cookies.remove('token')
                    Cookies.remove('username')
                    window.location.replace("/register")
                    const error = new Error(res.error);
                    throw error;
                }
            }).catch(err => {
                Cookies.remove('token')
                Cookies.remove('username')
                window.location.replace("/register")
                console.error(err);
                this.setState({ loading: false, redirect: true });
            });
        }
        
        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/register" />;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    }
}