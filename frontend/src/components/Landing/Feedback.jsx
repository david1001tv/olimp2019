import React, {Component} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {Button, TextField, LinearProgress, Paper} from 'react-md';
import validate from 'validate.js';
import autobind from 'autobind-decorator';

import {sendFeedback} from '~api';

class Feedback extends Component {
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
        message: {
            presence: {
                allowEmpty: false,
                message: 'Не може бути порожнім',
            },
        },
    };

    state = {
        data: {
            email: '',
            message: '',
        },
        errors: {
            email: [],
            message: [],
            generic: [],
        },
        isLoading: false,
    };

    @autobind
    async handleSubmit(e) {
        const {errors, data} = this.state;
        e.preventDefault();

        const validationResult = validate(data, Feedback.validationConstraints);

        if (validationResult !== undefined) {
            this.setState({errors: {...errors, ...validationResult}});
            return;
        }

        this.setState({isLoading: true});
        try {
            let response = await sendFeedback(this.state.data);

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
            [name]: Feedback.validationConstraints[name],
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

    render() {
        console.log('Feedback render');

        const {email, message} = this.state.data;

        return (
            <div className="feedback-form">
                <div className="md-text-center title">
                    <h3>Зворотній зв'язок</h3>
                </div>
                <div className="md-text-center">
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
                                id="message"
                                value={message}
                                onChange={value => this.handleChange(value, 'message')}
                                label="Повiдомлення"
                                multiLine={true}
                                rows={1}
                                error={!!this.state.errors.message.length}
                                errorText={this.state.errors.message.map(e => <div>{e}</div>)}
                            />
                        </div>
                    </div>
                    <div className="md-text--error md-headline md-text-center">
                        {this.state.errors.generic.map(e => <div>{e}</div>)}
                    </div>
                    <div className="md-text-center">
                        {this.state.isLoading ? <LinearProgress /> : null}
                        <button
                            type="submit"
                            className="drawn-btn drawn-btn__feedback"
                            disabled={this.state.isLoading}
                        >
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Feedback;
