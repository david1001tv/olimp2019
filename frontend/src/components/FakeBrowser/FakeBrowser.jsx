import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import Register from './Register';

import './FakeBrowser.sass';
import linkRegisterImage from '../../img/1-4 (browser)/link-register.png';
import linkPstuImage from '../../img/1-4 (browser)/link-pstu.png';
import linkKnImage from '../../img/1-4 (browser)/link-kn.png';
import PubSub from 'pubsub-js';


class FakeBrowser extends Component {
    state = {
        formIsVisible: false,
        searchIsSubmitted: false,
    };

    @autobind
    handleSubmit(e) {
        e.preventDefault();
        this.setState({searchIsSubmitted: true});
    }

    @autobind
    handleRegistrationSuccess() {
        PubSub.publish('browser', 'form-submitted');
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
            )
        }
        return (
            <div className="fake-browser">
                <div className="controls-container">
                    <div className="input-container">
                        <form
                            onSubmit={this.handleSubmit}
                        >
                            <input
                                type="text"
                                placeholder="Введіть запит"
                            />
                            {
                                this.state.searchIsSubmitted ?
                                    <div className="warning">Комп'ютер тільки для навчання</div>
                                    :
                                    null
                            }
                        </form>
                    </div>
                    <div className="links-container">
                        <a
                            className="pstu-link"
                            href="http://pstu.edu/uk/"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <img
                                src={linkPstuImage}
                                height="100"
                            />
                        </a>
                        <a
                            className="kn-link"
                            href="http://kn.pstu.edu"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <img
                                src={linkKnImage}
                                height="100"
                            />
                        </a>
                        <span
                            className="register-link"
                            onClick={() => this.setState({formIsVisible: true})}
                        >
                            <img
                                src={linkRegisterImage}
                                height="100"
                            />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default FakeBrowser;
