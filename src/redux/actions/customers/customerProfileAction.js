export const SET_CUSTOMER = 'SET_CUSTOMER';
export const SET_PURCHASE_HISTORY = 'SET_PURCHASE_HISTORY';
export const SET_CUSTOMER_PROFILE = 'SET_CUSTOMER_PROFILE';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export function setCustomerProfile(customer) {
    return {
        type: SET_CUSTOMER_PROFILE,
        customer
    }
}
export function setPurchaseHistory(purchasehistory) {
    return {
        type: SET_PURCHASE_HISTORY,
        purchasehistory
    }
}


export function fetchCustomerProfile(custometid) {
    const JwTtoken = window.localStorage.getItem('token')

    return dispatch => {
        fetch(BASE_URL + `customers/cms/${custometid}`
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
                dispatch(setCustomerProfile(jsondata)))
    }
}
export function fetchCustomerPurchase(custometid) {
    const JwTtoken = window.localStorage.getItem('token')

    return dispatch => {
        fetch(BASE_URL + `customerspurchases/cms?id=${custometid}`
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
                dispatch(setPurchaseHistory(jsondata.purchages)))
    }
}


export function fetchCustomerSummary(custometid) {
    const JwTtoken = window.localStorage.getItem('token')

    return dispatch => {
        fetch(BASE_URL + `user/wallet/${custometid}`
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
                dispatch(setPurchaseHistory(jsondata.summary)))
    }
}



export function updateWallet(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'updatewallet/cms', {
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
export function updateNotes(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'callcenter/cms', {
            method: 'post',
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

