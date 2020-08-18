import React, { Component } from 'react'
import { Header, Button } from 'semantic-ui-react'
import { loginUser } from '../../actions/user'
import { connect } from 'react-redux'

class AttendanceSheet extends Component {

    renderDataRows = () => {
        return this.props.thisEventsUsers.map(user => {
            let color
            let message
            let buttonMessage
            let id
            if (user.attended === false) {
                color = "red"
                message = "absent"
                buttonMessage = "Mark Present"
                id = "present"
            } else {
                color = "green"
                message = "present"
                buttonMessage = "Mark Absent"
                id = "absent"
            }
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td style={{backgroundColor: `${color}`}}>{message}</td>
                    <td><Button id={id} name={user.id} onClick={this.changeAttendance}>{buttonMessage}</Button></td>
                </tr>
            ) 
        })
    }

    changeAttendance = event => {
        let attendance = event.target.id === "present" ? true : false 
        const URL = "http://localhost:3001/user_events/" + event.target.name 
        const token = localStorage.getItem("token")
        const payload = { user_event: {
            attended: attendance
        }} 
        const reqObj = {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            }, 
            body: JSON.stringify(payload)
        }
        fetch(URL, reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.loginUser(data.user.data.attributes)
        })
    }

    render() {
        return (
            <div className="attendance-sheet">
                <Header as="h1">Attendance for: <br></br> {this.props.event.title} - {this.props.ensembleName}</Header>
                <Header as="h2">{this.props.event.start_time}</Header>
                <table style={{width: "40%", margin: "auto"}} className="ui celled table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDataRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapDispatchToProps = {
    loginUser
} 

export default connect(null, mapDispatchToProps)(AttendanceSheet)