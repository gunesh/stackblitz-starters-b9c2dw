export const SET_EPISODE = 'SET_EPISODE';
export const ADD_EPISODE = 'ADD_EPISODE';
export const UPDATE_EPISODE ='UPDATE_EPISODE';
export const CHANGE_EPISODE_STATUS = 'CHANGE_EPISODE_STATUS'
const BASE_URL =process.env.REACT_APP_API_BASE_URL+'episode/';// 'http://10.33.82.99:3000/api/v1/episode/';

export function setEpisode(episode) {
    return {
        type: SET_EPISODE,
        episode
    }
}
export function addEpisode(episode){
    return {
        type: ADD_EPISODE,
        episode
    }
}
export function EpisodeUpdate(episode){
    return {
        type: UPDATE_EPISODE,
        episode
    }
}

export function changestatus(episode){
      return {
        type: CHANGE_EPISODE_STATUS,
        episode
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



export function fetchEpisodes() {
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
              dispatch(setEpisode(jsondata.episode)) )
    }
}

export function saveEpisode(data) {
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

export function updateEpisode(data) {
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
               dispatch(EpisodeUpdate(jsondata))
               )
    }
}

export function changeStatusEpisode(data) {
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




