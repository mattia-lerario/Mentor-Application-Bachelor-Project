import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const companySubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/company`;

export const companyService = {
    refreshToken,
    validateResetToken,
    getAll,
    getById,
    create,
    update,
    addMentorHours,
    createPowerRanking,
    delete: _delete,
    company: companySubject.asObservable(),
    get companyValue () { return companySubject.value }
};


function logout() {
    // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
    fetchWrapper.post(`${baseUrl}/revoke-token`, {});
    stopRefreshTokenTimer();
    userSubject.next(null);
    history.push('/account/login');
}

function refreshToken() {
    return fetchWrapper.post(`${baseUrl}/refresh-token`, {})
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
         });
}

function validateResetToken(token) {
    return fetchWrapper.post(`${baseUrl}/validate-reset-token`, { token });
}


function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    console.log(id);
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function addMentorHours(id, params){

    return fetchWrapper.post(`${baseUrl}/hours/${id}`, params)
    .then(company => {
            company = { ...companySubject.value, ...company };
            companySubject.next(company);        
        return company;
    });

}

function createPowerRanking(id, params){
    console.log(params);

    return fetchWrapper.post(`${baseUrl}/powerranking/${id}`, params)
    .then(company => {
            company = { ...companySubject.value, ...company };
            companySubject.next(company);        
        return company;
    });

}

function update(id, params) {
    console.log(params)
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(company => {
            // update stored user if the logged in user updated their own record
            
                // publish updated user to subscribers
                company = { ...companySubject.value, ...company };
                companySubject.next(company);
            
            return company;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (id === userSubject.value.id) {
                logout();
            }
            return x;
        });
}

// helper functions

let refreshTokenTimeout;

function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}
