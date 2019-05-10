import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import Register from './Register';
import './registerMain.sass';
import PubSub from 'pubsub-js';
import PostRegister from './PostRegister';


class registerMain extends Component {
    // state = {
    //     formIsVisible: false,
    //     postRegisterIsVisible: false
    // };


    // @autobind
    // handleRegistrationSuccess() {
    //     this.setState({postRegisterIsVisible: true, formIsVisible: false,});
    //     PubSub.publish('browser', 'form-submitted');
    // }

    // handleContinue() {
    //     setTimeout(() => PubSub.publish('browser', 'continue'), 500);
    // }

    render()    {
        // if (this.state.formIsVisible) {
        //     return (
        //         <div className="fake-browser">
        //             <div className="form-container">
        //                 <Register
        //                     onSuccess={this.handleRegistrationSuccess}
        //                 />
        //             </div>
        //         </div>
        //     );
        // }

        // if (this.state.postRegisterIsVisible) {
        //     return (
        //         <div className="fake-browser">
        //             <div className="form-container1">
        //                 <PostRegister />
        //             </div>
        //         </div>
        //     );
        // }

        // return (
        //     <div className="fake-browser">
        //      <div className="regmain">
        //      <span
        //                     className="register-link"
        //                     onClick={() => this.setState({formIsVisible: true})}
        //                 >
        //                    <div className="imga"></div>
        //                 </span>
        //      </div>
        //     </div>
        // );

        const regClick = () => {
            console.log('Click');
        } 
        return (
            <div className="imga">
            123
                {/* <img src={require('./1-nan (Registration&Man)/link-register.png')} onClick={() => regClick()} /> */}
            </div>

        );
    }
}


export default registerMain;
