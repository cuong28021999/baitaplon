import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function withTeacher(ComponentToProtect) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                show: false
            };
        }

        UNSAFE_componentWillMount() {
            axios({
                baseURL: "http://localhost:3001",
                url: "/permission",
                headers: {
                    token: Cookies.get('token')
                },
                method: "GET",
            }).then(res => {
                if (res.status === 200 && res.data === "teacher") {
                    this.setState({ show: true })
                } else {
                    const error = new Error(res.error);
                    throw error
                }
            }).catch(err => {
                console.error(err);
                this.setState({ show: false })
            });
        }
        
        render() {
            const { show } = this.state
            if (!show) {
                return null
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    }
}