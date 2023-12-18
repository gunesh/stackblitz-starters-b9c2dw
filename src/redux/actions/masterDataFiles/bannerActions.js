
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const ADD_ONBOARDING = 'ADD_ONBOARDING';
export const UPDATE_ADD_ONBOARDING = 'UPDATE_ADD_ONBOARDING';
export const SET_BANNER = 'SET_BANNER';
const BASE_URL = process.env.REACT_APP_API_BASE_URL

export function setOnboarding(onboarding) {
    return {
        type: SET_BANNER,
        onboarding
    }
}
export function addOnboardingInfo(onboarding) {
    console.log(">>>>>", onboarding)
    return {
        type: ADD_ONBOARDING,
        onboarding
    }
}
export function onBoardingUpdate(onboarding) {
    console.log("update",onboarding)
    return {
        type: UPDATE_ADD_ONBOARDING,
        onboarding
    }
}

export function changestatus(onboarding) {
    console.log("status",onboarding)
    return {
        type: CHANGE_STATUS,
        onboarding
    }
}




export function fetchBanner(data) {
    const JwTtoken = window.localStorage.getItem('token')

    return dispatch => {
        fetch(BASE_URL + 'getonboarding/cms', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(jsondata => dispatch(setOnboarding(jsondata.onboarding)))
    }
}

export function addOnboarding(data) {

    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        console.log('URL from addOnboarding => ', BASE_URL + 'banner/cms');
        return fetch(BASE_URL + 'banner/cms', {
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

export function updateonBoarding(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'banner/cms', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(jsondata =>
                dispatch(onBoardingUpdate(jsondata.onboarding))
            )
    }
}

export function changeStatusOnboarding(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'onboarding/cms', {
            method: 'delete',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(jsondata =>
                dispatch(changestatus(jsondata.onboarding))
            )
    }
}
