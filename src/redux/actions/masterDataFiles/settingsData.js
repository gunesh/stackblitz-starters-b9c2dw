

 export const FETH_SETTING_INFO ='FETH_SETTING_INFO';
const BASE_URL = process.env.REACT_APP_API_BASE_URL+'settings/'
export function getSettingData(settingData) {
    return {
        type:FETH_SETTING_INFO,
        settingData
    }
}


export function fetchsettingsData() {
    const JwTtoken = window.localStorage.getItem('token')
 
    return dispatch => {
        return fetch(BASE_URL + 'cms',{
             method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer '+ JwTtoken,

            }
        })
            .then(res => res.json())
            .then(json => dispatch(getSettingData(json.settings)))
    }
}



export function fetchNotificationSettingsData() {
    const JwTtoken = window.localStorage.getItem('token')
 
    return dispatch => {
        return fetch(BASE_URL + 'notification_template',{
             method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer '+ JwTtoken,

            }
        })
            .then(res => res.json())
            .then(json => dispatch(getSettingData(json.templates)))
    }
}

export function updatesettingData(data) {
  
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
      return  fetch(BASE_URL + 'cms',{
             method: 'put',
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


export function updateNotificationSettingData(data) {
  
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
      return  fetch(BASE_URL + 'notification_template',{
             method: 'put',
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



// export function AddString(data) {
  
//     const JwTtoken = window.localStorage.getItem('token');
//     return dispatch => {
//       return  fetch(BASE_URL + 'cms',{
//              method: 'POST',
//              body: JSON.stringify(data),
//             headers: {
//                 'Authorization': 'Bearer '+ JwTtoken,
//                 'Accept': 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json'
//             }
//         })
//              .then( function (response){
//                 return response.json();
//             }
                
//                )
//     }
// }

// export function deleteStrings(data) {
//     const JwTtoken = window.localStorage.getItem('token');
//     return dispatch => {
//         return fetch(BASE_URL + 'cms', {
//             method: 'delete',
//             body: JSON.stringify(data),
//            headers: {
//                 'Authorization': 'Bearer '+ JwTtoken,
//                 'Accept': 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json'
//             }
//         })  
//              .then( function (response){
//                 return response.json();
//             }
                
//                )
//     }
// }
