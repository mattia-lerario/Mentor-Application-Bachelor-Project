import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const mentorSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/mentor`;

export const mentorService = {
    refreshToken,
    validateResetToken,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    mentor: mentorSubject.asObservable(),
    get mentorValue () { return mentorSubject.value }
};


function logout() {
    // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
    fetchWrapper.post(`${baseUrl}/revoke-token`, {});
    stopRefreshTokenTimer();
    mentorSubject.next(null);
    history.push('/account/login');
}

function refreshToken() {
    return fetchWrapper.post(`${baseUrl}/refresh-token`, {})
        .then(mentor=> {
            // publish user to subscribers and start timer to refresh token
            mentorSubject.next(mentor);
            startRefreshTokenTimer();
            return mentor;
        });
}

function validateResetToken(token) {
    return fetchWrapper.post(`${baseUrl}/validate-reset-token`, { token });
}


function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(id, params) {

    console.log(id);
    return fetchWrapper.post(baseUrl, params, id);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(mentor => {

            console.log(mentor, mentorSubject);
            // update stored user if the logged in user updated their own record
            
            if (mentor.id === mentorSubject.value) {
                // publish updated user to subscribers
                mentor = { ...mentorSubject.value, ...mentor };
                mentorSubject.next(mentor);
            }
            return mentor;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (id === mentorSubject.value.id) {
                logout();
            }
            return x;
        });
}

// helper functions

let refreshTokenTimeout;

function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(mentorSubject.value.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}
