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

class CreateClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            name: '',
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

    onSubmitCreate = (event) => {
        event.preventDefault()

        axios({
            baseURL: "http://localhost:3001",
            url: "/class",
            headers: {
                token: Cookies.get('token')
            },
            data: {
                name: this.state.name
            },
            method: "POST"
        }).then(res => {
            if (res.status === 200) {
                alert(`Create class success! Class code: '${res.data}'`);
                window.location.replace("/class");
            } else {
                const err = new Error(res)
                throw err
            }
        }).catch(err => console.log(err));
    }

    render() {
        const {modal} = this.state;
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
                                placeholder="Class name"
                                className="form-control"
                                onChange={this.handleName}
                            />
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

export default CreateClass;