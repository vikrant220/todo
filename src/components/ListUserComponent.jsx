import React, { Component } from 'react'
import UserService from '../services/UserService'

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tasks: []
        }
        this.addtask = this.addtask.bind(this);
        this.edittask = this.edittask.bind(this);
        this.deletetask = this.deletetask.bind(this);
    }

    deletetask(sno){
        UserService.deletetask(sno).then( res => {
            this.setState({tasks: 
                this.state.tasks.
                filter(task => task.sno !== sno)});
        });
    }
    viewtask(sno){
        this.props.history.push(`/view-task/${sno}`);
    }
    edittask(sno){
        this.props.history.push(`/add-task/${sno}`);
    }

    componentDsnoMount(){
        UserService.gettasks().then((res) => {
            if(res.data==null)
            {
                this.props.history.push('/add-task/_add');
            }
            this.setState({ tasks: res.data});
        });
    }

    addtask(){
        this.props.history.push('/add-task/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">
                     Tasks List</h2>
                 <div className = "row">
                    <button className="btn btn-primary"
                     onClick={this.addtask}> Add Task</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className 
                        = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Title</th>
                                    <th> Description</th>
                                    <th> Deadline Date </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tasks.map(
                                        task => 
                                        <tr key = {task.sno}>
                                   <td> { task.title} </td>   
                                   <td> {task.desc}</td>
                                   <td> {task.date}</td>
                                             <td>
                      <button onClick={ () => 
                          this.edittask(task.sno)} 
                               className="btn btn-info">Update 
                                 </button>
                       <button style={{marginLeft: "10px"}}
                          onClick={ () => this.deletetask(task.sno)} 
                             className="btn btn-danger">Delete 
                                 </button>
                       <button style={{marginLeft: "10px"}} 
                           onClick={ () => this.viewtask(task.sno)}
                              className="btn btn-info">View 
                                  </button>
                                    </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                 </div>
            </div>
        )
    }
}

export default ListUserComponent
