export const SET_PRODUCT = 'SET_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CHANGE_PRODUCT_STATUS = 'CHANGE_PRODUCT_STATUS'

const BASE_URL = process.env.REACT_APP_API_BASE_URL;//'http://13.232.37.143:3000/api/v1/';

export function setProduct(products) {
    return {
        type: SET_PRODUCT,
        products
    }
}
export function addProduct(products) {
    return {
        type: ADD_PRODUCT,
        products
    }
}
export function productUpdate(products) {
    return {
        type: UPDATE_PRODUCT,
        products
    }
}
export function changestatus(products) {
    return {
        type: CHANGE_PRODUCT_STATUS,
        products
    }
}

export function fetchProduct(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        fetch(BASE_URL + 'product/cms', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken
            }
        })
            .then(res => res.json())
            .then(jsondata =>
                dispatch(setProduct(jsondata.product)))
    }
}

export function importData() {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'product/cms/import', {
            method: 'POST',
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

export function saveProduct(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'addproduct/cms', {
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

export function updateProduct(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'product/cms', {
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

export function changeStatusProduct(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'product/cms', {
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

