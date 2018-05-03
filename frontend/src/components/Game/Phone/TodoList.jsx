import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import './TodoList.sass';


class TodoList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let todos = [...this.props.todos];
        todos.sort((a, b) => a.isDone - b.isDone);

        return (
            <div className="todo-list">
                <div className="head">
                    <span className="title">Перелік справ</span>
                </div>
                <div className="list">
                    <ul>
                        {
                            todos.map(todo => (
                                <li className="clearfix" key={todo.id}>
                                    <div className="text">{todo.text}</div>
                                    <div className="state">
                                        {
                                            todo.isDone
                                                ?
                                                <i className="fas fa-check-circle ok"></i>
                                                :
                                                <div className="circle"></div>
                                        }
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default TodoList;
