import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import Mail from './Mail';
import HomeScreen from './HomeScreen';

import './Phone.sass';


class Phone extends Component {
    static propTypes = {
        date: PropTypes.string,
        isShown: PropTypes.any,
        time: PropTypes.string,
        todos: PropTypes.any,
        messages: PropTypes.any,
    };

    state = {
        showMail: false,
    };

    constructor(props) {
        super(props);

    }

    @autobind
    handleMailClick() {
        this.setState({
            showMail: true,
        });
    }

    @autobind
    handleMapClick() {

    }

    @autobind
    handleHomeClick() {
        this.setState({
            showMail: false,
        });
    }

    render() {
        const {showMail} = this.state;
        const {isShown} = this.props;

        let className = `phone-wrapper ${isShown ? 'phone-wrapper--shown' : ''}`;
        return (
            <div className={className}>
                <div className="dynamic"></div>
                <div className="screen">
                    <div className="top-bar">
                        <div className="date" id="date">{this.props.date}</div>
                        <div className="time" id="time">{this.props.time}</div>
                        <div className="right">
                            <i className="fas fa-wifi" aria-hidden="true">o</i>
                            <i className="fas fa-signal">o</i>
                            <i className="fas fa-battery-half">o</i>
                        </div>
                    </div>
                    {
                        showMail
                            ?
                            null
                            :
                            <HomeScreen
                                onMailClick={this.handleMailClick}
                                onMapClick={this.handleMapClick}
                                todos={this.props.todos}
                            />
                    }
                    {showMail ? <Mail messages={this.props.messages} /> : null}
                </div>
                <div className="button" id="btn-home" onClick={this.handleHomeClick}>
                    <div className="square"></div>
                </div>
            </div>
        );
    }
}

export default Phone;
