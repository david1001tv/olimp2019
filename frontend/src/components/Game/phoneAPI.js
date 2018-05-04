// Используется в компоненте GameWrapper.jsx
import {messages} from './MailTexts';

const phoneAPI = {
    addTodo(todo) {
        todo.isDone = !!todo.isDone; // Приведение к типу Boolean
        this.setState({todos: [...this.state.todos, todo]});
    },

    addTodos(todos) {
        todos.forEach(todo => todo.isDone = !!todo.isDone);
        this.setState({todos: [...this.state.todos, ...todos]});
    },

    completeTodo(id) {
        let todoIndex = this.state.todos.findIndex(e => e.id === id);
        if (todoIndex !== -1) {
            let todo = {...this.state.todos[todoIndex]};
            todo.isDone = true;
            let newTodos = [...this.state.todos];
            newTodos.splice(todoIndex, 1, todo);
            this.setState({todos: newTodos});
        }
    },

    clearTodos() {
        this.setState({todos: []});
    },

    addMessage(message) {
        this.setState({phoneMessages: [message, ...this.state.phoneMessages]});
    },

    addMessageById(id) {
        let message = messages.find(e => e.id === id);
        if (message) {
            this.setState({phoneMessages: [message, ...this.state.phoneMessages]});
        }
    },

    addMessages(messages) {
        this.setState({phoneMessages: [...messages, ...this.state.phoneMessages]});
    },

    setMessages(messages) {
        this.setState({phoneMessages: [...messages]});
    },

    setTime(time) {
        this.setState({phoneTime: time});
    },

    setDate(date) {
        this.setState({phoneDate: date});
    },

    setEnabled(enabled) {
        this.setState({phoneEnabled: enabled});
    }
};

export default phoneAPI;
