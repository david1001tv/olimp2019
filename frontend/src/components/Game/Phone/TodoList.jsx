import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import './TodoList.sass';


class TodoList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="todo-list">
                <div className="head">
                    <span className="title">Перелік справ</span>
                </div>
                <div className="list">
                    <ul>
                        <li className="clearfix">
                            <div className="text">Lorem ipsum dolor sit.</div>
                            <div className="state">
                                <i className="fas fa-check-circle ok"></i>
                            </div>
                        </li>
                        <li className="clearfix">
                            <div className="text">Lorem ipsum dolor sit.</div>
                            <div className="state">
                                <i className="fas fa-check-circle ok"></i>
                            </div>
                        </li>
                        <li className="clearfix">
                            <div className="text">Lorem ipsum dolor sit.</div>
                            <div className="state">
                                <i className="fas fa-check-circle ok"></i>
                            </div>
                        </li>
                        <li className="clearfix">
                            <div className="text">Lorem ipsum dolor sit.</div>
                            <div className="state">
                                <div className="circle"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default TodoList;
