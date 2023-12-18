

export const SET_USERS = 'SET_USERS';
export const SET_ROLES = 'SET_ROLES';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const CHANGE_USER_STATUS = 'CHANGE_USER_STATUS';
const BASE_URL = process.env.REACT_APP_API_BASE_URL + 'user/';
const BASE_URL1 = process.env.REACT_APP_API_BASE_URL + 'userroles/';//'http://10.33.82.99:3000/api/v1/show/';
export function setUsers(users) {
    return {
        type: SET_USERS,
        users
    }
}
export function setRoles(roles) {
    return {
        type: SET_ROLES,
        roles
    }
}
export function addUser(users) {
    return {
        type: ADD_USER,
        users
    }
}

export function UserUpdate(users) {
    return {
        type: UPDATE_USER,
        users
    }
}
export function changestatus(users) {
    return {
        type: CHANGE_USER_STATUS,
        users
    }
}


export function fetchUsers() {
    const JwTtoken = window.localStorage.getItem('token')

    return dispatch => {
        fetch(BASE_URL + 'cms', {
            method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken
            }
        })
            .then(res => res.json())
            .then(jsondata =>
                dispatch(setUsers(jsondata.user)))
    }
}
export function fetchUserRoles() {
    const JwTtoken = window.localStorage.getItem('token')

    return dispatch => {
        fetch(BASE_URL1 + 'cms', {
            method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken
            }
        })
            .then(res => res.json())
            .then(jsondata =>
                dispatch(setRoles(jsondata.role)))
    }
}

// export function saveUser(data) {

//     const JwTtoken = window.localStorage.getItem('token');
//     return dispatch => {
//         fetch(BASE_URL + 'cms/new', {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: {
//                 'Authorization': 'Bearer ' + JwTtoken,
//                 'Accept': 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(res => res.json())
//             .then(jsondata => { dispatch(addUser(jsondata)); return jsondata }
//             )
//     }
// }
function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText)
        error.response = response;
        throw error;
    }
}

export function saveUser(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'cms/new', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(handleResponse)
            .then(jsondata => { dispatch(addUser(jsondata)); return jsondata });
    }
}

export function updateUser(data) {
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
                dispatch(UserUpdate(jsondata))
            )
    }
}

export function changeStatusUser(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'cms', {
            method: 'delete',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(jsondata =>
                dispatch(changestatus(jsondata))
            )
    }
}

