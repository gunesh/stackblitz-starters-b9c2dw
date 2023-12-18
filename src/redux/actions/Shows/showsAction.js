export const SET_SHOWS = 'SET_SHOWS';
 export const UPDATE_SHOWS = 'UPDATE_SHOWS';
export const ADD_SHOWS = 'ADD_SHOWS';
export const CHANGE_SHOWS_STATUS ='CHANGE_SHOWS_STATUS';
const BASE_URL = process.env.REACT_APP_API_BASE_URL+'show/';//'http://10.33.82.99:3000/api/v1/show/';
export function setShows(shows) {

    return {
        type: SET_SHOWS,
        shows
    }
}
export function addShow(shows) {
    return {
        type: ADD_SHOWS,
        shows
    }
}

export function ShowsUpdate(shows){
     return {
        type: UPDATE_SHOWS,
        shows
    }
}
export function changestatus(shows){
     return {
        type: CHANGE_SHOWS_STATUS,
        shows
    }
}

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText)
        error.response = response;
        throw error;
    }
}


export function fetchShows() {
    const JwTtoken = window.localStorage.getItem('token')
    
    return dispatch => {
        fetch(BASE_URL + 'cms',{
             method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer '+ JwTtoken
            }
        })
            .then(res => res.json())
            .then(jsondata =>
              dispatch(setShows(jsondata.show)) )
    }
}

export function saveShows(data) {
  
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
      return fetch(BASE_URL + 'cms',{
             method: 'POST',
             body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer '+ JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
              .then( function (response){
                return response.json();
            }
           )
    }
}

export function updateShows(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'cms', {
            method: 'put',
            body: JSON.stringify(data),
           headers: {
                'Authorization': 'Bearer '+ JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })  .then(res => res.json())
            .then(jsondata =>
               dispatch(ShowsUpdate(jsondata))
               )
    }
}
export function startShow(data) {
  
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'cms/startshow', {
            method: 'put',
            body: JSON.stringify(data),
           headers: {
                'Authorization': 'Bearer '+ JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })   .then( function (response){
                return response.json();
            }
                
               )
    }
}

export function changeStatusShow(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'cms', {
            method: 'delete',
            body: JSON.stringify(data),
           headers: {
                'Authorization': 'Bearer '+ JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })  .then(res => res.json())
            .then(jsondata =>
               dispatch(changestatus(jsondata))
               )
    }
}

