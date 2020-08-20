import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'

class EventAttendancePlanned extends Component {

    renderDataRows = () => {
        return this.props.thisEventsUsers.map(user => {
            let color
            let backgroundColor
            if (user.attending === "yes") {
                color = "black"
                backgroundColor = "green"
            } else if (user.attending === "no") {
                color = "white"
                backgroundColor = "red"
            } else {
                color = "black"
                backgroundColor = "yellow"
            }
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td style={{color: `${color}`, backgroundColor: `${backgroundColor}`}}>{user.attending}</td>
                </tr>
            ) 
        })
    }

    render() {
        return (
            <div className="planned-attendance-sheet">
                <Header style={{marginTop: "10px"}} as="h1">Planned Attendance for: <br></br> {this.props.event.title} - {this.props.ensembleName}</Header>
                <Header as="h2">{this.props.event.start_time}</Header>
                <table style={{width: "40%", margin: "auto"}} className="ui celled table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Plans to Attend?</th>
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

export default EventAttendancePlanned