import React, { Component } from 'react'
import UserService from '../services/UserService'

class ViewUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sno: this.props.match.params.sno,
            task: {}
        }
    }

    componentDsnoMount(){
        UserService.gettaskBysno(this.state.sno).then( res => {
            this.setState({task: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> 
                    View task Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label>task Name: </label>
                            <div> { this.state.task.title }
                            </div>
                        </div>
                        <div className = "row">
                            <label> Task Description </label>
                            <div> { this.state.task.desc }
                            </div>
                        </div>
                        <div className = "row">
                            <label> task Deadline date : </label>
                            <div> { this.state.task.date }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewUserComponent
