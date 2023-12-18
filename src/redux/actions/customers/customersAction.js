export const SET_CUSTOMER = 'SET_CUSTOMER';
export const SET_CALL_HISTORY = 'SET_CALL_HISTORY';
export const SEARCH_CUSTOMER = 'SEARCH_CUSTOMER';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;


export function setCustomer(customer) {
    return {
        type: SET_CUSTOMER,
        customer
    }
}
export function setCallHistory(callhistory) {
    return {
        type: SET_CALL_HISTORY,
        callhistory
    }
}

export function searchCustomerProfile(customer) {
    return {
        type: SEARCH_CUSTOMER,
        customer
    }
}

export function fetchCustomer() {
    const JwTtoken = window.localStorage.getItem('token')

    return dispatch => {
        fetch(BASE_URL + 'customers/cms', {
            method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken,
                'Accept': 'application/json, text/plain, */*'
            }
        })
            .then(res => res.json())
            .then(jsondata =>
                dispatch(setCustomer(jsondata.users)))
    }
}
export function searchCustomer(customer,type) {
    const JwTtoken = window.localStorage.getItem('token')

    return dispatch => {
        fetch(BASE_URL + `customersearch/cms/1/5?${type}=${customer}`
            , {
                method: 'get',
                headers: {
                    "content-Type": "application/json",
                    'Authorization': 'Bearer ' + JwTtoken,
                    'Accept': 'application/json, text/plain, */*'
                }
            })
            .then(res => res.json())
            .then(jsondata =>
                dispatch(searchCustomerProfile(jsondata)))
    }
}
export function filterCustomer(data) {
    const JwTtoken = window.localStorage.getItem('token')
   
    return dispatch => {
        fetch(BASE_URL +`customersearch/cms/1/100?startDate=${data.startDate}&endDate=${data.endDate}`
            , {
                method: 'get',
                headers: {
                    "content-Type": "application/json",
                    'Authorization': 'Bearer ' + JwTtoken,
                   
                }
            })
            .then(res => res.json())
            .then(jsondata => 
                dispatch(setCustomer(jsondata.customer))
         )
               
    }
}

export function searchHistory(customer) {
    const JwTtoken = window.localStorage.getItem('token')

    return dispatch => {
        fetch(BASE_URL + `callcenter/cms?q=` + customer
            , {
                method: 'get',
                headers: {
                    "content-Type": "application/json",
                    'Authorization': 'Bearer ' + JwTtoken,
                    'Accept': 'application/json, text/plain, */*'
                }
            })
            .then(res => res.json())
            .then(jsondata =>
                dispatch(setCallHistory(jsondata.callcenterLog)))
    }
}


export function changeStatusCustomer(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'statusupdate/cms', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }

        )
    }
}

export function getCallHistory() {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'callcenter/cms', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(jsondata =>
                dispatch(setCallHistory(jsondata.callcenterLog)))
    }
}

