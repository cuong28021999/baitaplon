import React, { Component } from 'react'
import axios from 'axios'
import Joi from '@hapi/joi'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            permission: 'student'
        }
    }

    handleName = (event) => {
        this.setState({
            name: event.target.value
        })
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

    handlePermission = (event) => {
        this.setState({
            permission: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        const {name, email, password, permission} = this.state;
        console.log(permission);
        
        const schema = Joi.object({
            name: Joi.string().min(6).max(255).required(),
            email: Joi.string().min(6).max(255).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().min(6).max(1024).required(),
            permission: Joi.string().min(5).max(7).required()
        })

        const {error} = schema.validate({
            name: name,
            email: email,
            password: password,
            permission: permission
        })

        if (error) return alert(error.details[0].message);

        axios({
            baseURL: "http://localhost:3001",
            url: "/auth/register",
            method: "POST",
            data: {
                name: name,
                email: email,
                password: password,
                permission: permission
            }
        }).then(res => {
            if (res.status === 200) {
                alert('Create succces!')
            } else {
                const err = new Error()
                throw err
            }
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <div className="Register container d-flex flex-row mt-5 shadow-lg">
                <div className="d-flex flex-column justify-content-center align-items-center bg-primary p-5 text-light w-50">
                    <h1 className="my-4">Welcome Back!</h1>
                    <span>To keep connected with us please</span>
                    <span>login with your personal info</span>
                </div>
                <form
                    onSubmit={this.onSubmit}
                    method="post"
                    className="form-group w-50 d-flex flex-column text-primary p-5 ml-5 align-items-center"
                >
                    <h1 className="my-5">Create Account</h1>
                    <input
                        type="text"
                        name="name"
                        placeholder="Username"
                        className="form-control my-3 w-75"
                        onChange={this.handleName}
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="form-control my-3 w-75"
                        onChange={this.handleEmail}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control my-3 w-75"
                        onChange={this.handlePassword}
                    />
                    <div className="input-group my-3 w-75">
                        <select onChange={this.handlePermission} name="permission" className="custom-select">
                            <option value="student" defaultValue>Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                        <div className="input-group-append">
                            <label className="input-group-text">Permission</label>
                        </div>
                    </div>
                    <input
                        name="submit"
                        type="submit"
                        value="Create"
                        className="btn btn-primary w-75 my-3"
                    />
                </form>
            </div>
        )
    }
}

export default Register;