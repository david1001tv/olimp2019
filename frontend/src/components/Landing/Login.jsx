import React, {Component} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {Button, TextField, LinearProgress, Paper} from 'react-md';
import validate from 'validate.js';
import autobind from 'autobind-decorator';
import {GoogleLogin} from 'react-google-login';

import googleLoginButton from '../../img/buttons/button-google-released.png';

import {logIn, isAuthenticated, googleLogIn} from '~api';

class Login extends Component {
    static validationConstraints = {
        email: {
            email: {
                message: 'Невалідний e-mail'
            },
            presence: {
                allowEmpty: false,
                message: 'Не може бути порожнім',
            },
        },
        password: {
            presence: {
                allowEmpty: false,
                message: 'Не може бути порожнім',
            },
            length: {
                minimum: 6,
                maximum: 30,
                tooShort: "Занадто короткий",
                tooLong: "Занадто довгий",
            }
        },
    };

    state = {
        data: {
            email: '',
            password: '',
        },
        errors: {
            email: [],
            password: [],
            generic: [],
        },
        isLoading: false,
    };

    handleSubmit = async (e) => {
        const {errors, data} = this.state;
        e.preventDefault();

        const validationResult = validate(data, Login.validationConstraints);

        if (validationResult !== undefined) {
            this.setState({errors: {...errors, ...validationResult}});
            return;
        }

        this.setState({isLoading: true});
        try {
            await logIn(data);
        } catch (e) {
            console.error(e);
        } finally {
            this.setState({isLoading: false});
        }
    };

    validateField = (name) => {
        let validationResult = validate({
            [name]: this.state.data[name],
        }, {
            [name]: Login.validationConstraints[name],
        });
        if (validationResult === undefined) {
            validationResult = {[name]: []};
        }
        this.setState({errors: {...this.state.errors, ...validationResult}});
    };

    handleChange = (value, field) => {
        this.setState({
            data: {...this.state.data, [field]: value},
            errors: {...this.state.errors, [field]: []},
        });
    };

    @autobind
    async handleGoogleResponseSuccess(res) {
        this.setState({isLoading: true});
        try {
            let basicProfile = res.getBasicProfile();
            await googleLogIn({
                idToken: res.tokenId,
                userId: basicProfile.getId(),
            });
        } catch (e) {
            console.error(e);
        } finally {
            this.setState({isLoading: false});
        }
    }

    render() {
        console.log('Login render', isAuthenticated());
        if (isAuthenticated()) {
            return <Redirect to={this.props.redirectTo} from="/auth/login"/>
        }

        const {email, password} = this.state.data;

        return (
            <div className="login-form">
                <div className="md-text-center title">
                    <h3>Вхід</h3>
                </div>
                <div className="md-text-center">
                    <GoogleLogin
                        render={renderProps => (
                            <button
                                onClick={renderProps.onClick}
                                className="drawn-btn drawn-btn__google"
                            >
                            </button>
                        )}
                        onSuccess={this.handleGoogleResponseSuccess}
                        onFailure={e => console.error(e)}
                        clientId="160162546321-8u5mfbbgqa28l3q5d80l8is3ps9gsd0c.apps.googleusercontent.com"
                    />
                </div>
                <form
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <div>
                            <TextField
                                id="email"
                                type="email"
                                value={email}
                                onChange={value => this.handleChange(value, 'email')}
                                label="e-mail"
                                onBlur={() => this.validateField('email')}
                                error={!!this.state.errors.email.length}
                                errorText={this.state.errors.email.map(e => <div>{e}</div>)}
                            />
                        </div>
                        <div>
                            <TextField
                                id="password"
                                type="password"
                                value={password}
                                onChange={value => this.handleChange(value, 'password')}
                                label="Пароль"
                                onBlur={() => this.validateField('password')}
                                error={!!this.state.errors.password.length}
                                errorText={this.state.errors.password.map(e => <div>{e}</div>)}
                            />
                        </div>
                    </div>
                    <div className="md-text-center">
                        {this.state.isLoading ? <LinearProgress /> : null}
                        <button
                            type="submit"
                            className="drawn-btn drawn-btn__log-in"
                            disabled={this.state.isLoading}
                        >
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);
