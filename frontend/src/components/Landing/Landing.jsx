import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import { DialogContainer } from 'react-md';
import './Landing.sass';

class Landing extends Component {
    render() {
        return (
            <div>
                <DialogContainer
                    visible={true}
                >
                    <Login />
                </DialogContainer>
            </div>
        );
    }
}

export default Landing;
