import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Joi from '@hapi/joi' 

export const LoginContext = React.createContext()

export class LoginProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLogin: false
        }

        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.onSubmitLogin = this.onSubmitLogin.bind(this)
        this.onSignOut = this.onSignOut.bind(this)
    }

    UNSAFE_componentWillMount() {
        axios({
            baseURL: "http://localhost:3001",
            url: "/checktoken",
            headers: {
                token: Cookies.get('token')
            },
            method: "GET",
        }).then(res => {
            if (res.status === 200) {
                this.setState({
                    isLogin: true
                })
            } else {
                const err = new Error()
                throw err;
            }
        }).catch(err => console.log(err))
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onSubmitLogin = (event) => {
        event.preventDefault();

        const { email, password } = this.state;

        // validate on client
        const schema = Joi.object({
            email: Joi.string().min(6).max(255).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().min(6).max(1024).required()
        })
        const { error } = schema.validate({
            email: email,
            password: password
        })
        if (error) return alert(error.details[0].message)

        // login process
        axios({

            url: "/auth/login",
            method: "POST",
            data: {
                email: email,
                password: password
            }
        }).then(res => {

            if (res.status === 200) {
                Cookies.set('token', res.headers.token)
                Cookies.set('username', res.data)
                this.setState({
                    isLogin: true
                })
                alert('Login success!')
                window.location.replace("/");
            } else {
                this.setState({
                    isLogin: true
                })
                const err = new Error()
                throw err;
            }
        }).catch(err => {
            this.setState({
                isLogin: true
            })
            alert('Login failed!')
        });
    }

    onSignOut = () => {
        this.setState({
            isLogin: false,
            email: '',
            password: ''
        })

        Cookies.remove('token');
        Cookies.remove('username');
        window.location.replace("/register");
    }

    render() {
        return (
            <LoginContext.Provider
                value={{
                    email: this.state.email,
                    password: this.state.password,
                    handleEmail: this.handleEmail,
                    handlePassword: this.handlePassword,
                    onSubmitLogin: this.onSubmitLogin,
                    isLogin: this.state.isLogin,
                    onSignOut: this.onSignOut
                }}
            >
                {this.props.children}
            </LoginContext.Provider>
        )
    }
}