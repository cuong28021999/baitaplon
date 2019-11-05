import React, { Component } from 'react'

import axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

import {
    ListGroup
} from 'reactstrap';

import withTeacher from '../components/withTeacher'
import CreateClass from '../components/CreateClass'
const CreateClassWithTeacher = withTeacher(CreateClass)



export default class Classes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notFound: true,
            classes: []
        }
    }

    UNSAFE_componentWillMount() {
        axios({
            baseURL: "http://localhost:3001",
            url: "/class",
            method: "GET",
            headers: {
                token: Cookies.get('token')
            }
        }).then(res => {
            if (res.status === 200) {
                this.setState({
                    notFound: false,
                    classes: res.data
                })
            } else {
                const err = new Error(res)
                throw err
            }
        }).catch(err => console.log(err))
    }

    render() {
        const { classes } = this.state
        return (
            <div className="YourClass container mt-5">
                <h2
                    className="my-3"
                >Your class</h2>
                <CreateClassWithTeacher
                    buttonLabel="Create class"
                    title="Create Class"
                    className="mb-2"
                />
                <ListGroup>
                    {classes.map((item, index) => (
                        <Link
                            to={`class/${item._id}`}
                            key={index}
                            className="list-group-item-action input-group list-group-item d-flex flex-row justify-content-lg-between"
                        >
                            <span className="">{item.name}</span>
                            <div>
                                <button className="btn btn-info">
                                    <img
                                        src="http://localhost:3001/images/edit-icon.svg"
                                        width="20"
                                        alt="edit"
                                    />
                                </button>
                                <button className="btn btn-danger ml-2">
                                    <img
                                        src="http://localhost:3001/images/delete-icon.svg"
                                        width="20"
                                        alt="delete"
                                    />
                                </button>
                            </div>
                        </Link>
                    ))}
                </ListGroup>
            </div>
        )
    }
}