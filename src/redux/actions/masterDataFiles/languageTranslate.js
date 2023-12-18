

 export const FETH_LANGUAGES ='FETH_LANGUAGES';
const BASE_URL = process.env.REACT_APP_API_BASE_URL+'languagetranslations/'
export function getLanguageData(language) {
    return {
        type:FETH_LANGUAGES,
        language
    }
}


export function fetchLanguageTranslate() {
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
            .then(json => dispatch(getLanguageData(json)))
    }
}


export function UpdateString(data) {
  
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
export function AddString(data) {
  
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
      return  fetch(BASE_URL + 'cms',{
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

export function deleteStrings(data) {
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
        })  
             .then( function (response){
                return response.json();
            }
                
               )
    }
}
