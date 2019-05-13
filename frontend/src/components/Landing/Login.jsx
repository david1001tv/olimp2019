import React, {Component} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {Button, TextField, LinearProgress, Paper} from 'react-md';
import validate from 'validate.js';
import autobind from 'autobind-decorator';
import {GoogleLogin} from 'react-google-login';
import line from '../../img/login/line.png';
import googleFon from '../../img/login/fon_google.png';

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
            let response = await logIn(data);

            if (response.errors) {
                this.setState({ errors: { ...this.state.errors, ...response.errors } });
            }
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
            let response = await googleLogIn({
                idToken: res.tokenId,
                userId: basicProfile.getId(),
            });

            if (response.errors) {
                this.setState({ errors: { ...this.state.errors, ...response.errors } });
            }
        } catch (e) {
            console.error(e);
        } finally {
            this.setState({isLoading: false});
        }
    }

    render() {
        console.log('Login render', isAuthenticated());
        if (isAuthenticated()) {
            return <Redirect push from="/" to="/game" />
        }

        const {email, password} = this.state.data;

        return (
            <div className="login-form">
                <div className="md-text-center title">
                    <h3 className="title_log">Вхід</h3>
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
                >
                    <div className="md-text--error md-headline md-text-center">
                        {this.state.errors.generic.map(e => <div>{e}</div>)}
                    </div>
                    <div>
                        <div>
                            <TextField
                                block={true}
                                className="wrap_em"
                                inputClassName="email_style"
                                placeholder="e-mail"
                                id="email"
                                type="email"
                                value={email}
                                onChange={value => this.handleChange(value, 'email')}
                                
                               // error={!!this.state.errors.email.length}
                               // errorText={this.state.errors.email.map(e => <div>{e}</div>)}
                            />
                        </div>
                        <div>
                            <TextField
                                block={true}
                                className="wrap_em"
                                inputClassName="email_style"
                                placeholder="Пароль"
                                id="password"
                                type="password"
                                value={password}
                                onChange={value => this.handleChange(value, 'password')}
                               
                                // onBlur={() => this.validateField('password')}
                                // error={!!this.state.errors.password.length}
                                // errorText={this.state.errors.password.map(e => <div>{e}</div>)}
                            />
                        </div>
                    </div>
                    <div className="md-text-center">
                        {this.state.isLoading ? <LinearProgress /> : null}
                        <button
                            type="submit"
                            className="login_goo"
                            disabled={this.state.isLoading}
                        >
                        УВІЙТИ
                        </button>
                       
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);
