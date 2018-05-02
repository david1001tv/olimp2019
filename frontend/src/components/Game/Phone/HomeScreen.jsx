import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import TodoList from './TodoList';
import './HomeScreen.sass';


class HomeScreen extends Component {
    static propTypes = {
        onMailClick: PropTypes.func,
        onMapClick: PropTypes.func,
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="home" id="home-page">
                <TodoList />
                <div className="apps">
                    <div className="item" id="btn-map" onClick={this.props.onMapClick}>
                        <div className="icon map">

                        </div>
                        <div className="title">
                            Мапа
                        </div>
                    </div>
                    <div className="item" id="btn-mail" onClick={this.props.onMailClick}>
                        <div className="icon mail">

                        </div>
                        <div className="title">
                            Пошта
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeScreen;