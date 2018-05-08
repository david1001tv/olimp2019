const checkpointStates = [
    'Docs',
    'Scanner',
    'Browser'
];

const states = [
    'Intro',
    'Docs',
    'Scanner',
    'Browser',
    'GrannyBad',
    'Cross',
    'WaterAlyoshin',
    'WaterMarket',
    'Translate',
    'Proffs',
];

class ProgressManager {
    constructor() {
        this._checkpoints = states.map(key => ({key: key, status: 'unavailable'}));
        // this._checkpoints = states.map(key => ({key: key, status: 'available'})); // DEBUG
        this._checkpoints[0].status = 'available';
        this._checkpoints[3].status = 'available'; // DEBUG
    }

    getStatus(key) {
        let searchRes = this._checkpoints.find(e => e.key === key);
        return searchRes ? searchRes.status : null;
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
}

export default new ProgressManager();