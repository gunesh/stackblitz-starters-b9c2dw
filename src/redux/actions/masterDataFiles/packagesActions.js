
export const SET_PACKAGES = 'SET_PACKAGES';
export const ADD_PACKAGES ='ADD_PACKAGES';
const BASE_URL = process.env.REACT_APP_API_BASE_URL+'packages/'
export function setAuctions(packages) {
    return {
        type: SET_PACKAGES,
        packages
    }
}
export function addPackage(packages) {
    return {
        type: ADD_PACKAGES,
        packages
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



export function fetchpackages() {
    const JwTtoken = window.localStorage.getItem('token')
    return dispatch => {
        fetch(BASE_URL + 'cms',{
             method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer'+ JwTtoken,

            }
        })
            .then(res => res.json())
            .then(packagesdata => dispatch(setAuctions(packagesdata.packages)))
    }
}

export function savePackage(data) {
   console.log("inreducer:<<<<<<<<<<<<,",JSON.stringify(data))
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        fetch(BASE_URL + 'cms',{
             method: 'POST',
             body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer '+ JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(jsondata =>
               dispatch(addPackage(jsondata))
               )
    }
}
export function updatePackage(data) {
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
        })  .then( function (response){
                return response.json();
            }
                
               )
    }
}

