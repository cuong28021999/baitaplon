import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'

import axios from 'axios'
import Cookies from 'js-cookie'

import Joi from '@hapi/joi'

class CreateExam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            name: '',
            start: null,
            limit: 60,
            classId: this.props.classId,
            err: []
        }

        this.handleName = this.handleName.bind(this)
        this.onSubmitCreate = this.onSubmitCreate.bind(this)
    }

    toggle = () => this.setState({ modal: !this.state.modal })

    handleName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleStart = (event) => {
        this.setState({
            start: event.target.value
        })
    }

    handleLimit = (event) => {
        this.setState({
            limit: event.target.value
        })
    }

    onSubmitCreate = (event) => {
        event.preventDefault();
        const { name, start, classId, limit } = this.state

        const schema = Joi.object({
            name: Joi.string().min(1).max(255).required(),
            start: Joi.date().required().min(Date.now()),
            limit: Joi.number().min(0).required()
        })

        const {error} = schema.validate({
            name: name,
            start: start,
            limit: limit
        })


        if (error) {
            let err = []
            err.push(error.details[0].message)
            this.setState({
                err: err
            })
            return;
        }

        axios({
            baseURL: "http://localhost:3001",
            url: "/exam",
            headers: {
                token: Cookies.get('token')
            },
            data: {
                classId: classId,
                name: name,
                start: start,
                limit: limit
            },
            method: "POST"
        }).then(res => {
            if (res.status === 200) {
                window.location.replace(`/class/${this.state.classId}`);
            } else {
                const err = new Error(res)
                throw err
            }
        }).catch(err => console.log(err));
    }

    render() {
        const { modal } = this.state;
        return (
            <div>
                <Button
                    color="info"
                    onClick={this.toggle}
                    className={this.props.className}
                >
                    {this.props.buttonLabel}
                </Button>
                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader
                        className="text-info"
                        toggle={this.toggle}
                    >
                        {this.props.title}
                    </ModalHeader>
                    <form
                        onSubmit={this.onSubmitCreate}
                        method="post"
                        className="form-group"
                    >
                        <ModalBody>
                            <input
                                name="name"
                                type="text"
                                placeholder="Exam name"
                                className="form-control"
                                onChange={this.handleName}
                            />

                            <div className="input-group my-3">
                                <input
                                    name="start"
                                    type="datetime-local"
                                    className="form-control"
                                    onChange={this.handleStart}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">Time start</div>
                                </div>
                            </div>

                            <div className="input-group mt-3">
                                <input
                                    name="limit"
                                    type="number"
                                    defaultValue={60}
                                    className="form-control"
                                    onChange={this.handleLimit}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">Time limit (minutes)</div>
                                </div>
                            </div>

                            {
                                this.state.err.map((item, index) => 
                                    <span key={index} className="text-danger">(*) {item}</span>
                                )
                            }
                        </ModalBody>
                        <ModalFooter>
                            <input
                                name="submit"
                                type="submit"
                                value="Create and get Class code"
                                className="btn btn-info"
                            />
                            <Button
                                color="secondary"
                                onClick={this.toggle}
                            >Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }

}

export default CreateExam