export const CONTACT_CONTENT = 'CONTACT_CONTENT';
export const SET_CONTENT = 'SET_CONTENT';
export const HOW_TO_PLAY_CONTENT = 'HOW_TO_PLAY_CONTENT';
export const TERM_CONTENT = 'TERM_CONTENT';
export const UPDATE_CONTENT = 'UPDATE_CONTENT';
const BASE_URL = process.env.REACT_APP_API_BASE_URL + 'content/'
export function setContent(content) {

    return {
        type: SET_CONTENT,
        content
    }
}

export function ContentUpdate(content) {
    return {
        type: UPDATE_CONTENT,
        content
    }
}

export function contactContent(content) {
    return {
        type: CONTACT_CONTENT,
        content
    }
}
export function howToPlayContent(content) {
    return {
        type: HOW_TO_PLAY_CONTENT,
        content
    }
}
export function termContent(content) {
    return {
        type: TERM_CONTENT,
        content
    }
}


export function fetchContent(content) {

    const JwTtoken = window.localStorage.getItem('token')

    return dispatch => {
        return fetch(BASE_URL + `cms?type=${content.type}&languageId=${content.languageId}`, {
            method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken,

            }
        })
            .then(res => res.json())
            .then(jsondata => dispatch(setContent(jsondata.content)))
    }
}
export function fetchHowToPlayContent(content) {

    const JwTtoken = window.localStorage.getItem('token')

    return dispatch => {
        return fetch(BASE_URL + `cms?type=${content.type}&languageId=${content.languageId}`, {
            method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken,

            }
        })
            .then(res => res.json())
            .then(jsondata => dispatch(howToPlayContent(jsondata.content)))
    }
}
export function fetchTermContent(content) {

    const JwTtoken = window.localStorage.getItem('token')

    return dispatch => {
        return fetch(BASE_URL + `cms?type=${content.type}&languageId=${content.languageId}`, {
            method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken,

            }
        })
            .then(res => res.json())
            .then(jsondata => dispatch(termContent(jsondata.content)))
    }
}


export function fetchContactContent(content) {

    const JwTtoken = window.localStorage.getItem('token')

    return dispatch => {
        return fetch(BASE_URL + `cms?type=${content.type}&languageId=${content.languageId}`, {
            method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken,

            }
        })
            .then(res => res.json())
            .then(jsondata => dispatch(contactContent(jsondata.content)))
    }
}


export function updateContent(content) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'cms', {
            method: 'put',
            body: JSON.stringify(content),
            headers: {
                'Authorization': 'Bearer ' + JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(jsondata => { dispatch(ContentUpdate(jsondata)); return jsondata })
    }
}
