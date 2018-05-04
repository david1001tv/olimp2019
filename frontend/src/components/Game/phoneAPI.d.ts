interface Todo {
    id: string,
    text: string,
    isDone?: boolean,
}

interface Message {
    id: string,
    text: string,
    theme: string,
    date: string,
    sender: string,
    isRead: boolean,
}

declare module phoneAPI {
    function addTodo(todo: Todo);
    function addTodos(todos: Todo[]);
    function completeTodo(id: string);
    function clearTodos();

    function addMessage(message: Message);
    function addMessages(message: Message[]);

    function setTime(time: string);
    function setDate(date: string);
    function setEnabled(enabled: boolean);
}
