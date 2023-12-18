// smhkm2 new files
export const SET_SETTINGS = 'SET_SETTINGS';
const BASE_URL = process.env.REACT_APP_API_BASE_URL


export function setSetting(setting) {
    return {
        type: SET_SETTINGS,
        setting
    }
}

export function sendNotificationAction(data) {

    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        console.log('URL from addOnboarding => ', BASE_URL + 'notification/send');
        return fetch(BASE_URL + 'notification/send', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                console.log(response+"respo");
                return response.json();
            }

            )
    }
}

export function configNotificationAction(data) {

    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        console.log('URL from addOnboarding => ', BASE_URL + 'notification/config');
        return fetch(BASE_URL + 'notification/config', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                console.log(response+"respo");
                return response.json();
            }

            )
    }
}

export function fetchAppSettingAction(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        fetch(BASE_URL + 'notification/setting', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken
            }
        })
            .then(res => res.json())
            .then(jsondata =>
                dispatch(setSetting(jsondata.settings)))
    }
}
