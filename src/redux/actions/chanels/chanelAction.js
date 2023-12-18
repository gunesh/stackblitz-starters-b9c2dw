export const SET_CHANEL = 'SET_CHANEL';
export const ADD_CHANNEL = 'ADD_CHANNEL';
export const UPDATE_CHANNEL= 'UPDATE_CHANNEL';
export const CHANGE_CHANNEL_STATUS= 'CHANGE_CHANNEL_STATUS';
const BASE_URL = process.env.REACT_APP_API_BASE_URL+'channel/';//'http://10.33.82.99:3000/api/v1/channel/';



export function setChanels(chanels) {
    
    return {
        type: SET_CHANEL,
        chanels
    }
}
export function addChannel(chanels) {
    return {
        type: ADD_CHANNEL,
        chanels
    }
}

export function ChannelUpdate(chanels){
    
       return {
        type: UPDATE_CHANNEL,
        chanels
    }

}
export function changestatus(chanels){
      console.log(chanels)
        return {
        type: CHANGE_CHANNEL_STATUS,
        chanels
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


export function fetchChannel() {
    const JwTtoken = window.localStorage.getItem('token')
    
    return dispatch => {
        fetch(BASE_URL + 'cms',{
             method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer '+ JwTtoken,
                'Accept': 'application/json, text/plain, */*'
            }
        })
            .then(res => res.json())
            .then(jsondata =>
              dispatch(setChanels(jsondata.channel)) )
    }
}

export function saveChannel(data) {
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

export function updateChannel(data) {
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
               dispatch(ChannelUpdate(jsondata))
               )
    }
}

export function changeStatusChannel(data) {
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
