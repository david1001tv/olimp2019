import React, {Component} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';


class Regulations extends Component{


    state = {
        text:  `
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aliquid culpa officiis asperiores praesentium nesciunt velit excepturi magnam, rerum est odit omnis nisi fugiat et eaque qui iste maxime consectetur.
        Id rerum numquam iure minima aperiam distinctio quibusdam assumenda ut accusantium optio commodi nulla consectetur a, esse quas, excepturi laudantium. Doloremque iste perferendis alias quis tempore fugiat nobis accusamus magni.
        Nam, qui officiis labore perspiciatis magni eius explicabo eaque inventore iusto eveniet reiciendis earum debitis doloribus voluptate quasi obcaecati enim aliquam, at voluptatibus sit in. Incidunt autem nisi veniam minus.
        Blanditiis sunt obcaecati voluptas, quod mollitia, aperiam, recusandae velit esse minus natus veritatis veniam nam maiores illum saepe praesentium quibusdam nesciunt dignissimos fugiat expedita. Laboriosam quis corrupti ex distinctio cupiditate.
        Esse, cupiditate veritatis rerum labore deleniti dolorem repellendus voluptatibus sed laudantium! Minus sunt sint, dolore doloremque veniam nulla ipsam cumque mollitia? Culpa illo eius explicabo labore excepturi, in quia? Recusandae?
        `
    }

    render(){
        return(
            <div className="regulation-text">
                <p>
                    {this.state.text}
                </p>
            </div>
        );
    }
}

export default Regulations;