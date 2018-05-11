let token = localStorage.getItem('token');
// let token = '';
const API_URL = `${window.location.protocol}//${window.location.hostname}:8090/api`;
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
        authSuccess(response.token)
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
        authSuccess(response.token)
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
        authSuccess(response.token)
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
        authSuccess(response.token)
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