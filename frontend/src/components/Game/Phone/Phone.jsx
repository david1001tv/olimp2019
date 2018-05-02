import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import Mail from './Mail';
import HomeScreen from './HomeScreen';

import './Phone.sass';


class Phone extends Component {
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
                        <span className="date" id="date">24.04.18</span>
                        <span className="time" id="time">17:56</span>
                        <span className="right">
                    <i className="fas fa-wifi" aria-hidden="true"></i>
                    <i className="fas fa-signal"></i>
                    <i className="fas fa-battery-half"></i>
                </span>
                    </div>
                    {
                        showMail
                            ?
                            null
                            :
                            <HomeScreen
                                onMailClick={this.handleMailClick}
                                onMapClick={this.handleMapClick}
                            />
                    }
                    { showMail ? <Mail /> : null}
                </div>
                <div className="button" id="btn-home" onClick={this.handleHomeClick}>
                    <div className="square"></div>
                </div>
            </div>
        );
    }
}

export default Phone;
