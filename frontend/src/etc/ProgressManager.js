import { isAuthenticated, sendHistory, sendChoice, getChoice, sendSubjects, getHistory, getMe, getSubjects } from '~api';
import PubSub from 'pubsub-js';
import autobind from 'autobind-decorator';

export const COMPLETED = 'completed';
export const AVAILABLE = 'available';
export const UNAVAILABLE = 'unavailable';

const states = [
    'Intro',
    'PostIntro',
    'Questions',
    'Schedule',
    'FillWords',
    'LayoutPuzzle',
    'Tags',
    'CutImages',
    'Cards',
    'Magistracy',
    'Crypto',
    'Robot',
    'Outro',
    'Labyrinth',
    'FirstInterview',
    'SecondInterview',
    'ThirdInterview',
    'Cross',
    'Conference',
    'ThreeInARow',
    'fixBugs',
    'End'
];

const stages = [
    {
        start: 'Intro',
        end: 'Questions'
    },
    {
        start: 'Schedule',
        end: 'Outro',
    },
    {
        start: 'Labyrinth',
        end: 'Cross',
    },
    {
        start: 'Conference',
        end: 'End',
    }

];

class ProgressManager {
    constructor() {
        this._entriesQueue = localStorage.getItem('entriesQueue');
        if (this._entriesQueue === null)
            this._entriesQueue = [];
        else
            this._entriesQueue = JSON.parse(this._entriesQueue);
        if (this._entriesQueue.length && isAuthenticated())
            this.sendQueue();

        this._checkpoints = states.map(key => ({key: key, status: 'unavailable'}));
        // this._checkpoints = states.map(key => ({key: key, status: 'available'})); // DEBUG
        this._checkpoints[0].status = 'available';

        PubSub.subscribe('auth', this.sendQueue);
    }

    getStatus(key) {
        let searchRes = this._checkpoints.find(e => e.key === key);
        return searchRes ? searchRes.status : null;
    }

    /**
     * @param index {number} Номер этапа, начинается с 1
     */
    getStageStatus(index) {
        let stage = stages[index - 1];
        let start = this.getStatus(stage.start);
        let end = this.getStatus(stage.end);
        if (end === COMPLETED) {
            return COMPLETED
        }
        if (start !== UNAVAILABLE) {
            return AVAILABLE;
        }
        return UNAVAILABLE;
    }

    completeState(key, score) {
        let stateIndex = this._checkpoints.findIndex(e => e.key === key);

        if (stateIndex !== -1) {
            let searchRes = this._checkpoints[stateIndex];
            searchRes.status = 'completed';
            this._checkpoints[stateIndex + 1].status = 'available';
        }
    }

    setHistory(history) {
        history.forEach(entry => {
            let index = this._checkpoints.findIndex(e => e.key === entry.state);
            if (index !== -1) {
                this._checkpoints[index].status = 'completed';
                this._checkpoints[index + 1].status = 'available';
            }
        });
    }

    saveHistoryEntry(state, time, score) {
        if (isAuthenticated()) {
            sendHistory(state, { time, score });
        } else {
            let searchRes = this._entriesQueue.find(entry => entry.state === state);
            if (searchRes) {
                searchRes.time = time;
                searchRes.score = score;
            }
            else {
                this._entriesQueue.push({state, time, score});
            }
            localStorage.setItem('entriesQueue', JSON.stringify(this._entriesQueue));
        }
    }

    saveChoice(friend, science, magistracy, profession) {
        if (isAuthenticated()) {
            sendChoice({ friend, science, magistracy, profession });
        }
    }

    getChoice() {
        if (isAuthenticated()) {
            return getChoice();
        }
    }

    saveSubjects(subjects) {
        if (isAuthenticated()) {
            sendSubjects(subjects);
        }
    }

    getSubjects() {
        if (isAuthenticated()) {
            return getSubjects();
        }
    }

    getHistory() {
        if(isAuthenticated()) {
            return getHistory();
        }
    }

    getMe() {
        if(isAuthenticated()) {
            return getMe();
        }
    }

    @autobind
    async sendQueue() {
        for (let entry of this._entriesQueue) {
            await sendHistory(entry.state, {
                time: entry.time,
                score: entry.score,
            });
        }

        this._entriesQueue = [];
        localStorage.setItem('entriesQueue', JSON.stringify(this._entriesQueue));
    }
}

export default new ProgressManager();