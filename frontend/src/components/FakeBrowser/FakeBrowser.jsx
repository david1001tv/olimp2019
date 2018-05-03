import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './FakeBrowser.sass';
import linkRegisterImage from '../../img/1-4 (browser)/link-register.png';
import linkPstuImage from '../../img/1-4 (browser)/link-pstu.png';
import linkKnImage from '../../img/1-4 (browser)/link-kn.png';


class FakeBrowser extends Component {
    render() {
        return (
            <div className="fake-browser">
                <div className="controls-container">
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Введіть запит"
                        />
                    </div>
                    <div className="links-container">
                        <span
                            className="register-link"
                        >
                            <img
                                src={linkRegisterImage}
                                height="100"
                            />
                        </span>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default FakeBrowser;
