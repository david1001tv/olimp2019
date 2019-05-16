import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {GoogleLogin} from 'react-google-login';
import {Button, TextField, LinearProgress} from 'react-md';
import autobind from 'autobind-decorator';
import validate from 'validate.js';
import './Register.sass';
import line from '../../img/1-0 (Intro)/line.png';
import googleFon from '../../img/1-0 (Intro)/fon_google.png';

import {register, googleRegister, isAuthenticated} from '~api';


// 
class Register extends Component {
    // Валидация данных
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

    static propTypes = {
        onSuccess: PropTypes.func,
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

    componentDidMount() {
        if (isAuthenticated()) {
            this.props.onSuccess();
        }
    }

    @autobind
    async handleSubmit(e) {
        e.preventDefault();
        const {errors, data} = this.state;

        const validationResult = validate(data, Register.validationConstraints);

        if (validationResult !== undefined) {
            this.setState({errors: {...errors, ...validationResult}});
            return;
        }
        this.setState({isLoading: true});
        try {
            let response = await register(this.state.data);

            if (response.errors) {
                this.setState({ errors: { ...this.state.errors, ...response.errors } });
                return;
            }

            this.props.onSuccess();
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
        this.setState({isLoading: true});
        try {
            let basicProfile = res.getBasicProfile();
            let response = await googleRegister({
                idToken: res.tokenId,
                userId: basicProfile.getId(),
                firstName: basicProfile.getGivenName(),
                lastName: basicProfile.getFamilyName(),
                email: basicProfile.getEmail()
            });

            if (response.errors) {
                this.setState({ errors: { ...this.state.errors, ...response.errors } });
                return;
            }
            this.props.onSuccess();
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

                <div className="text_l">
                <img src={line} alt=""/>
                <h2>увійти через</h2>
                <img src={line} alt=""/>
            </div>
           
           
                <GoogleLogin
                    render={renderProps => (
                             <div className="goo_butt"
                              onClick={renderProps.onClick}
                             >
                                 <h2>
                                 УВІЙТИ ЧЕРЕЗ
                                 </h2>
                                 <img src={googleFon} alt=""/>
                             </div>
                    )}
                    onSuccess={this.handleGoogleResponseSuccess}
                    onFailure={e => console.error(e)}
                    clientId="160162546321-8u5mfbbgqa28l3q5d80l8is3ps9gsd0c.apps.googleusercontent.com"
                />
            <div className="text_2">
                <img src={line} alt=""/>
                <h2>або</h2>
                <img src={line} alt=""/>
            </div>

                <form
                    onSubmit={this.handleSubmit}
                    className="md-grid"
                >
                    {/* <div className="md-text--error md-headline md-text-center md-cell--12">
                        {this.state.errors.generic.map(e => <div>{e}</div>)}
                    </div> */}
                    <TextField
                        block={true}
                        inputClassName="email_style"
                        className="md-cell md-cell--12 wrap_em"
                        placeholder="e-mail"
                        id="email"
                        type="email"
                        
                        value={email}
                        onChange={value => this.handleChange(value, 'email')}
                        // onBlur={() => this.validateField('email')}
                        // error={!!this.state.errors.email.length}
                        // errorText={this.state.errors.email.map(e => <div>{e}</div>)}
                    />
                    <TextField
                        block={true}
                        inputClassName="email_style"
                        className="md-cell md-cell--12 wrap_em"
                        id="firstName"
                        type="text"
                        placeholder="Ім'я"
                        value={firstName}
                        onChange={value => this.handleChange(value, 'firstName')}
                        // onBlur={() => this.validateField('firstName')}
                        // error={!!this.state.errors.firstName.length}
                        // errorText={this.state.errors.firstName.map(e => <div>{e}</div>)}
                    />
                    <TextField
                        block={true}
                        inputClassName="email_style"
                        className="md-cell md-cell--12 wrap_em"
                        id="lastName"
                        type="text"
                        placeholder="Прізвище"
                        value={lastName}
                        onChange={value => this.handleChange(value, 'lastName')}
                        // onBlur={() => this.validateField('lastName')}
                        // error={!!this.state.errors.lastName.length}
                        // errorText={this.state.errors.lastName.map(e => <div>{e}</div>)}
                    />
                    <TextField
                        block={true}
                        inputClassName="email_style"
                        className="md-cell md-cell--12 wrap_em"
                        id="password"
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={value => this.handleChange(value, 'password')}
                        // onBlur={() => this.validateField('password')}
                        // error={!!this.state.errors.password.length}
                        // errorText={this.state.errors.password.map(e => <div>{e}</div>)}
                    />

                    <div className="md-text-center md-cell md-cell--12">
                        {this.state.isLoading ? <LinearProgress /> : null}
                        <button
                            type="submit"
                            className="reggul"
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
