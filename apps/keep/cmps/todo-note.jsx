import { noteService } from "../services/note.service.js"

export class TodoNote extends React.Component {

    state = {
        header: '',
        todos: ''

    }

    componentDidMount = () => {
        const {csv} = this.props
        const todosAndHeader = noteService.csvToTodo(csv)
        const {todos, header} = todosAndHeader 
        console.log(todos, header)
        this.setState({todos})
        this.setState({header})
    }

    render() {
        const {todos, header} = this.state

        return <React.Fragment>
            {todos && <div className="todo-note">
                <h1>{header}</h1>
                <ul>
                    {todos.map(todo => <li key={todo.text}>{todo.text}</li>)}
                </ul>
            </div>
            }
        </React.Fragment>
    }



}