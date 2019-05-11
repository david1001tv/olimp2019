let token = localStorage.getItem('token');
// let token = '';
let API_URL = `http://127.0.0.1:8080/api`;
// if (window.location.port)
//     API_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;
// else
//     API_URL = `${window.location.protocol}//${window.location.hostname}/api`;

import PubSub from 'pubsub-js';

export function isAuthenticated() {
    return !!token;
}

export function logOut() {
    token = '';
    localStorage.setItem('token', '');
}

function authSuccess(_token) {
    token = _token;
    localStorage.setItem('token', token);
    PubSub.publish('auth');
}

export async function logIn(credentials) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());

    if (response.token) {
        authSuccess(response.token);
    }

    return response;
}

export async function register(data) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());

    if (response.token) {
        authSuccess(response.token);
    }

    return response;
}

export async function googleRegister(data) {
    const response = await fetch(`${API_URL}/auth/google-register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());

    if (response.token) {
        authSuccess(response.token);
    }

    return response;
}

export async function googleLogIn(credentials) {
    const response = await fetch(`${API_URL}/auth/google-login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());

    if (response.token) {
        authSuccess(response.token);
    }

    return response;
}

export async function sendHistory(state, data) {
    const response = await fetch(`${API_URL}/history/state/${state}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    });
}

export async function getHistory() {
    const response = await fetch(`${API_URL}/history/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    }).then(res => res.json());

    return response;
}


export async function sendFeedback(data) {
    const response = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    }).then(res => res.json());

    return response;
}

export async function getLike() {
    const response = await fetch(`${API_URL}/like`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    }).then(res => res.json());

    return response;
}

export async function getLikeCount() {
    const response = await fetch(`${API_URL}/like/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());

    return response;
}

export async function toggleLike() {
    const response = await fetch(`${API_URL}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    }).then(res => res.json());

    return response;
}

export async function getReport() {
    const response = await fetch(`${API_URL}/report/json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    }).then(res => res.json());

    return response;
}