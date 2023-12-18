
export const SAVE_LANGUAGE = 'SAVE_LANGUAGE';
export const EDIT_LANGUAGE  = 'EDIT_LANGUAGE';

const BASE_URL =process.env.REACT_APP_API_BASE_URL+'languages/';

export function setLanguage(language) {
    return {
        type: SAVE_LANGUAGE,
        language
    }
}

export function EditLanguage(language) {
    return {
        type: EDIT_LANGUAGE,
        language
    }
}


export function addAnotherLanguage(data) {

    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'cms', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            }

            )
    }
}

export function EditSelectedLanguage(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'cms', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(jsondata =>
                dispatch(EditLanguage(jsondata.onboarding))
            )
    }
}



  export function fetchLanguage() {
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
              dispatch(setLanguage(jsondata.language)) )
    }
}



