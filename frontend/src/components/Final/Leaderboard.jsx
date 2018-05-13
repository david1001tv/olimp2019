import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getReport} from '~api';

function formatTime(time) {
    let minutes = Math.floor(time / (1000 * 60));
    let seconds = time % (1000 * 60) / 1000;
    return `${minutes}:${seconds}`
}

class Leaderboard extends Component {
    state = {
        data: [],
    };

    componentDidMount() {
        getReport()
            .then(data => this.setState({data}));
    }

    render() {
        const {data} = this.state;

        return (
            <table cellSpacing="0" id="leaderboard">
                <tbody>
                <tr>
                    <th>Ім’я</th>
                    <th>Очки</th>
                    <th>Час</th>
                </tr>
                {
                    data.map(e => (
                        <tr>
                            <td>{e.name}</td>
                            <td>{e.score}</td>
                            <td>{formatTime(e.time)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        );
    }
}

export default Leaderboard;
