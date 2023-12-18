export const SET_ROLES = 'SET_ROLES';


export function setRoles(roles) {
    return {
        type: SET_ROLES,
        roles
    }
}

// function handleResponse(response) {
//     if (response.ok) {
//         return response.json();
//     } else {
//         let error = new Error(response.statusText)
//         error.response = response;
//         throw error;
//     }
// }


export function fetchRoles() {
    return dispatch => {
        fetch('http://localhost:3001/api/roles/getRoles')
            .then(res => res.json())
            .then(jsondata => dispatch(setRoles(jsondata)))
    }
}

