function Task(props) {
    return <li>{props.name}, {props.dueDate.toLocaleTimeString()},<button onClick={() => {props.delete_Task(props.taskId) }}>Delete</button></li>
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: props.list};

        this.handleAddTask = this.handleAddTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);

    }
    handleAddTask(task) {
        console.log("add task clicked");
        this.state.list.push(task);
        this.setState({list: this.state.list})
    }
    deleteTask(task) {
        console.log("delete task clicked");
        let d = this.state.list.filter(task_item => task_item.id !== task);
        this.setState({list: d})
    }
    render() {
        return (
            <div>
                <h1>TODO List</h1>
                <ol>
                    {
                        this.state.list.map((t) =>
                            <Task key={t.id} name={t.name} dueDate={t.dueDate} delete_Task = {this.deleteTask} taskId = {t.id}/>)
                    }
                </ol>
                <TaskNameForm onAddTask={this.handleAddTask} />
            </div>
        );
    }
}

class TaskNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dateChange = this.dateChange.bind(this);

    }

    handleSubmit(event) {
        const taskList = this.props.taskList;
        // create a task object
        event.preventDefault();
        const task = {id:Date.now(), name: this.state.value, 
        dueDate: new Date(),date:this.state.date};
        // add the task object to the task list
        this.props.onAddTask(task);
    }

    handleChange(event) {
        // code to set the state of the component
        this.setState({value: event.target.value});
      
    }
    dateChange(event){
        this.setState({date :event.target.value});
    }


    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} 
                onChange={this.handleChange}/>
                <input type="date" value={this.state.date} 
                onChange={this.dateChange}/>
                <input type="submit" value="Add Task" />
            </form>
        );
    }
}

ReactDOM.render(
    <TodoList list={[]} />,
    document.getElementById('todo')
);