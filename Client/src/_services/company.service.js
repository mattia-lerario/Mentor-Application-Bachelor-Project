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
    companySubject.next(null);
    history.push('/account/login');
}

function refreshToken() {
    return fetchWrapper.post(`${baseUrl}/refresh-token`, {})
        .then(company => {
            // publish user to subscribers and start timer to refresh token
            companySubject.next(company);
            startRefreshTokenTimer();
            return company;
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
    return fetchWrapper.get(`${baseUrl}/${id}`).then(company => { return company })
    
    
}


function create(id,params) {
    return fetchWrapper.post(baseUrl, params, id);
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
    
    return fetchWrapper.post(`${baseUrl}/powerranking/${id}`, params)
    .then(company => {
            company = { ...companySubject.value, ...company };
            companySubject.next(company);        
        return company;
    });

}

function update(id, params) {
    //console.log(params)
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(company => {
            // update stored user if the logged in user updated their own record
            
                // publish updated user to subscribers
                if (company.id === companySubject.value) {
                company = { ...companySubject.value, ...company };
                companySubject.next(company);
                }
            return company;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (id === companySubject.value.id) {
                logout();
            }
            return x;
        });
}

// helper functions

let refreshTokenTimeout;

function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(companySubject.value.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}
