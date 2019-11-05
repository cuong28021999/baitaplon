import React, { Component } from 'react'

export default class EditExam extends Component {

    render() {
        return (
            <div className="EditExam container">
                <h1>Edit exam</h1>
                <h2>ID: {this.props.match.params.examId}</h2>
            </div>
        )
    }
}