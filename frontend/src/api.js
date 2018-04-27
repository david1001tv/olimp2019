let token = localStorage.getItem('token');
const API_URL = `${window.location.protocol}//${window.location.hostname}:8090/api`;

export function isAuthenticated() {
  return !!token;
}

export async function logOut() {
  token = '';
  localStorage.setItem('token', '');
  // todo: add API request
}

export async function logIn(credentials) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

  token = response.token;
}

export async function register(data) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

  token = response.token;
}

export async function googleRegister (data) {
    const response = await fetch(`${API_URL}/auth/google-register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());

    token = response.token;
}

export async function googleLogIn(credentials) {
    const response = await fetch(`${API_URL}/auth/google-login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());

    token = response.token;
}