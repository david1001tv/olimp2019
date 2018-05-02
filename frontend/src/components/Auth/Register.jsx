import React, {Component} from 'react';
import {GoogleLogin} from 'react-google-login';
import {Button, TextField, LinearProgress} from 'react-md';
import autobind from 'autobind-decorator';
import validate from 'validate.js';
import './Register.sass';

import googleLogo from '../../img/google-logo.png';
import {register, googleRegister} from '~api';

class Register extends Component {
    static validationConstraints = {
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
        firstName: {
            presence: {
                allowEmpty: false,
                message: 'Не може бути порожнім',
            },
        },
        lastName: {
            presence: {
                allowEmpty: false,
                message: 'Не може бути порожнім',
            },
        },
        email: {
            email: {
                message: 'Невалідний e-mail'
            },
            presence: {
                allowEmpty: false,
                message: 'Не може бути порожнім',
            },
        },
    };

    state = {
        data: {
            password: '',
            email: '',
            firstName: '',
            lastName: ''
        },
        errors: {
            password: [],
            email: [],
            firstName: [],
            lastName: [],
            generic: [],
        },
        isLoading: false,
    };

    @autobind
    async handleSubmit(e) {
        e.preventDefault();
        const {errors, data} = this.state;

        const validationResult = validate(data, Register.validationConstraints);

        if (validationResult !== undefined) {
            this.setState({errors: {...errors, ...validationResult}});
            return;
        }

        console.log('submit');
        this.setState({isLoading: true});
        try {
            await register(this.state.data);
        } catch (e) {
            console.error(e);
        } finally {
            this.setState({isLoading: false});
        }
    };

    handleChange = (value, field) => {
        this.setState({data: {...this.state.data, [field]: value}});
    };

    @autobind
    async handleGoogleResponseSuccess(res) {
        console.log(res);
        this.setState({isLoading: true});
        try {
            let basicProfile = res.getBasicProfile();
            await googleRegister({
                idToken: res.tokenId,
                userId: basicProfile.getId(),
                firstName: basicProfile.getGivenName(),
                lastName: basicProfile.getFamilyName(),
                email: basicProfile.getEmail()
            });
        } catch (e) {
            console.error(e);
        } finally {
            this.setState({isLoading: false});
        }
    }

    @autobind
    validateField(name) {
        let validationResult = validate({
            [name]: this.state.data[name],
        }, {
            [name]: Register.validationConstraints[name],
        });
        if (validationResult === undefined) {
            validationResult = {[name]: []};
        }
        this.setState({ errors: { ...this.state.errors, ...validationResult } });
    };

    render() {
        const {password, email, firstName, lastName} = this.state.data;

        return (
            <div className="auth">
                <div className="title">
                    <h3>Реєстрація</h3>
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
                    className="md-grid"
                >
                    <TextField
                        className="md-cell md-cell--12"
                        id="email"
                        type="email"
                        label="e-mail"
                        value={email}
                        onChange={value => this.handleChange(value, 'email')}
                        onBlur={() => this.validateField('email')}
                        error={!!this.state.errors.email.length}
                        errorText={this.state.errors.email.map(e => <div>{e}</div>)}
                    />
                    <TextField
                        className="md-cell md-cell--6"
                        id="firstName"
                        type="text"
                        label="Ім'я"
                        value={firstName}
                        onChange={value => this.handleChange(value, 'firstName')}
                        onBlur={() => this.validateField('firstName')}
                        error={!!this.state.errors.firstName.length}
                        errorText={this.state.errors.firstName.map(e => <div>{e}</div>)}
                    />
                    <TextField
                        className="md-cell md-cell--6"
                        id="lastName"
                        type="text"
                        label="Прізвище"
                        value={lastName}
                        onChange={value => this.handleChange(value, 'lastName')}
                        onBlur={() => this.validateField('lastName')}
                        error={!!this.state.errors.lastName.length}
                        errorText={this.state.errors.lastName.map(e => <div>{e}</div>)}
                    />
                    <TextField
                        className="md-cell md-cell--12"
                        id="password"
                        type="password"
                        label="Пароль"
                        value={password}
                        onChange={value => this.handleChange(value, 'password')}
                        onBlur={() => this.validateField('password')}
                        error={!!this.state.errors.password.length}
                        errorText={this.state.errors.password.map(e => <div>{e}</div>)}
                    />

                    <div className="md-text-center md-cell md-cell--12">
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

export default Register;
