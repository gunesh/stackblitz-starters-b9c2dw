export const SET_PAYMENT = 'SET_PAYMENT';

const BASE_URL = 'http://10.33.82.99:3000/api/v1/channel/';

export function setPayment(payments) {
    
    return {
        type: SET_PAYMENT,
        payments
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


export function fetchPayment() {
    const JwTtoken = window.localStorage.getItem('token')
    
    return dispatch => {
        fetch(BASE_URL + 'cms',{
             method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer'+ JwTtoken
            }
        })
            .then(res => res.json())
            .then(jsondata =>
              dispatch(setPayment(jsondata)) )
    }
}


