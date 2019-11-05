import React, { Component } from 'react'

import CreateExam from '../components/CreateExam';

import Cookies from 'js-cookie'

import axios from 'axios'

import { Table } from 'reactstrap'

import { Link } from 'react-router-dom'

export default class YourClass extends Component {
    constructor(props) {
        super(props)
        this.exams = []
        this.state = {
            exams: []
        }
    }

    UNSAFE_componentWillMount() {
        axios({
            baseURL: "http://localhost:3001",
            url: "/exam",
            method: "GET",
            headers: {
                'classId': this.props.match.params.classId,
                'token': Cookies.get('token')
            }
        }).then(res => {
            if (res.status === 200) {
                this.exams = res.data
                this.setState({
                    exams: res.data
                })
            } else {
                const err = new Error(res)
                throw err
            }
        }).catch(err => console.log(err))
    }

    handleDelete = (event) => {
        const id = event.target.id
        const url = `/exam/${id}`
        axios({
            baseURL: "http://localhost:3001",
            url: url,
            method: "DELETE",
            headers: {
                'token': Cookies.get('token')
            }
        }).then(res => {
            if (res.status === 200) {
                this.exams = this.exams.filter((exam, index) => {
                    return exam._id !== id
                })

                this.setState({
                    exams: this.exams
                })
            } else {
                const err = new Error(res)
                throw err
            }
        }).catch(err => alert(err))
    }

    render() {
        const { exams } = this.state
        return (
            <div className="YourClass container mt-5">
                <CreateExam
                    buttonLabel="Create Exam"
                    title="Create your exam"
                    className="mb-2"
                    classId={this.props.match.params.classId}
                />
                {exams.length > 0 &&
                    <Table
                        className=""
                    >
                        <thead
                            className="thead-light"
                        >
                            <tr>
                                <th>#</th>
                                <th>Exam</th>
                                <th>Time start</th>
                                <th>Time limit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                exams.map((exam, index) => {
                                    let start = new Date(exam.start)
                                    let startConfig = `${start.toLocaleTimeString()} ${start.toLocaleDateString()}`
                                    return {
                                        _id: exam._id,
                                        name: exam.name,
                                        start: startConfig,
                                        limit: exam.limit
                                    }
                                }).map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.start}</td>
                                        <td>{item.limit}</td>
                                        <td>
                                            <Link
                                                to={location => `${location.pathname}/exam/${item._id}`}
                                                className="btn btn-info"
                                            ><img
                                                    src="http://localhost:3001/images/edit-icon.svg"
                                                    alt="edit"
                                                    width="20"
                                                />
                                            </Link>

                                            <button
                                                id={item._id}
                                                name={item.name}
                                                onClick={this.handleDelete}
                                                className="btn btn-danger ml-2"
                                            ><img
                                                    src="http://localhost:3001/images/delete-icon.svg"
                                                    alt="delete"
                                                    width="20"
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </Table>
                }
                {
                    exams.length === 0 && 
                    <h3 
                        className="text-danger"
                    >Nothing here!</h3>
                }
            </div>
        )
    }
}