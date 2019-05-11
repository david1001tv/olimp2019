import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import Register from './Register';

import './FakeBrowser.sass';
import linkRegisterImage from '../../img/1-4 (browser)/link-register.png';
import bookletImage from '../../img/1-4 (browser)/booklet.png';
import linkPstuImage from '../../img/1-4 (browser)/link-pstu.png';
import linkKnImage from '../../img/1-4 (browser)/link-kn.png';
import PubSub from 'pubsub-js';
import PostRegister from './PostRegister';


class FakeBrowser extends Component {
    state = {
        formIsVisible: false,
        postRegisterIsVisible: false,
        searchIsSubmitted: false,
    };


    @autobind
    handleRegistrationSuccess() {
        this.setState({postRegisterIsVisible: true, formIsVisible: false,});
        PubSub.publish('browser', 'form-submitted');
    }

    handleContinue() {
        setTimeout(() => PubSub.publish('browser', 'continue'), 500); // говно
    }

    render() {
        if (this.state.formIsVisible) {
            return (
                <div className="fake-browser">
                    <div className="form-container">
                        <Register
                            onSuccess={this.handleRegistrationSuccess}
                        />
                    </div>
                </div>
            );
        }

        if (this.state.postRegisterIsVisible) {
            return (
                <div className="fake-browser">
                    <div className="form-container1">
                        <PostRegister />
                    </div>
                    <button
                        className="btn-continue"
                        onClick={this.handleContinue}
                    >
                        Натисніть сюди, щоб продовжити...
                    </button>
                </div>
            );
        }

        return (
            <div className="fake-browser">
             <div className="regmain">
             <span
                            className="register-link"
                            onClick={() => this.setState({formIsVisible: true})}
                        >
                           <div className="imga"></div>
                        </span>
             </div>
            </div>
        );
    }
}

export default FakeBrowser;
