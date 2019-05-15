import React, {Component} from 'react';

import autobind from 'autobind-decorator';

import Register from './Register';

import './FakeBrowser.sass';
import PubSub from 'pubsub-js';
import PostRegister from './PostRegister';


class FakeBrowser extends Component {
    state = {
        formIsVisible: false,
        postRegisterIsVisible: false,
        searchIsSubmitted: false,
    };

    @autobind
    handleSubmit(e) {
        e.preventDefault();
        this.setState({searchIsSubmitted: true});
    }

    @autobind
    handleRegistrationSuccess() {
        this.setState({postRegisterIsVisible: true, formIsVisible: false,});
        PubSub.publish('browser', 'form-submitted');
    }

    handleContinue() {
        setTimeout(() => PubSub.publish('browser', 'continue'), 500);
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
