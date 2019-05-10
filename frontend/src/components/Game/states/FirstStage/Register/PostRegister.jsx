import React, {Component} from 'react';

class PostRegister extends Component {
    render() {
        return (
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d21721.113922599507!2d37.56688083672825!3d47.11594262208847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1557321576139!5m2!1sru!2sua" 
                    style={{
                        position: 'absolute', 
                        top: window.innerHeight/8.6 + 'px',
                        left: window.innerWidth/3.8 + 'px',
                        width: '47.7%',
                        height: '50.7%'
                        }}
                    frameBorder="0" allowFullScreen>
                </iframe>
        );
    }
}

export default PostRegister;
