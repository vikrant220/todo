import React, { Component } from 'react'
import UserService from '../services/UserService';

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            sno: this.props.match.params.sno,
            title: '',
            desc: '',
            date: ''
        }
        this.changetitleHandler =
            this.changetitleHandler.bind(this);
        this.changedescHandler =
            this.changedescHandler.bind(this);
        this.saveOrUpdatetask =
            this.saveOrUpdatetask.bind(this);
    }

    // step 3
    componentDsnoMount() {

        // step 4
        if (this.state.sno === '_add') {
            return
        } else {
            UserService.gettaskBysno(this.state.sno).
            then((res) => {
                let task = res.data;
                this.setState({
                    title: task.title,
                    desc: task.desc,
                    date: task.date
                });
            });
        }
    }
    saveOrUpdatetask = (e) => {
        e.preventDefault();
        let task = { title: this.state.title, desc:
             this.state.desc, date: this.state.date };
        console.log('task => ' + JSON.stringify(task));

        // step 5
        if (this.state.sno === '_add') {
            UserService.createtask(task).then(res => {
                this.props.history.push('/tasks');
            });
        } else {
            UserService.
            updatetask(task, this.state.sno).then(res => {
                this.props.history.push('/tasks');
            });
        }
    }

    changetitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    changedescHandler = (event) => {
        this.setState({ desc: event.target.value });
    }

    changedateHandler = (event) => {
        this.setState({ date: event.target.value });
    }

    cancel() {
        this.props.history.push('/tasks');
    }

    getTitle() {
        if (this.state.sno === '_add') {
            return <h3 className="text-center">Add Task</h3>
        } else {
            return <h3 className="text-center">Update task</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
        <div className="container">
            <div className="row">
               <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
            <div className="form-group">
              <label> Title: </label>
                <input placeholder="Task Title" 
                  name="title" className="form-control"
                    value={this.state.title} 
                      onChange={this.changetaskHandler} />
                          </div>
            <div className="form-group">
              <label> Description: </label>
                <input placeholder="Task Description" 
                   name="desc" className="form-control"
                     value={this.state.desc} 
                      onChange={this.changedescHandler} />
                                    </div>
            <div className="form-group">
                <label> Date : </label>
                    <input placeholder="DD/MM/YYYY" 
                       name="date" className="form-control"
                        value={this.state.date} 
                         onChange={this.changedateHandler} />
                                    </div>

             <button className="btn btn-success" 
                  onClick={this.saveOrUpdatetask}>Save
                    </button>
             <button className="btn btn-danger" 
                  onClick={this.cancel.bind(this)} 
                     style={{ marginLeft: "10px" }}>Cancel
                        </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateUserComponent
