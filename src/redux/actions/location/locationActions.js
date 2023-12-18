
export const EDIT_LOCATION = 'EDIT_LOCATION';
export const SAVE_LOCATION = 'SAVE_LOCATION';

const BASE_URL =process.env.REACT_APP_API_BASE_URL+'locations/';

export function EditLocation(location) {
    return {
        type: EDIT_LOCATION,
        location
    }
}

export function setLocation(location) {
    return {
        type: SAVE_LOCATION,
        location
    }
}



// export function addAnotherLocation(data) {
//     const JwTtoken = window.localStorage.getItem('token')

//     return dispatch => {
//         fetch(BASE_URL + 'cms', {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: {
//                 'Authorization': 'Bearer ' + JwTtoken,
//                 'Accept': 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(res => res.json())
//             .then(jsondata => dispatch(addLocation(jsondata.locations)))
//     }
// }


export function addAnotherLocation(data) {

    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        // console.log('URL from addOnboarding => ', BASE_URL + 'cms');
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

export function EditSelectedLocation(data) {
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
                dispatch(EditLocation(jsondata.onboarding))
            )
    }
}


  export function fetchLocation() {
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
              dispatch(setLocation(jsondata.locations)) )
    }
}



