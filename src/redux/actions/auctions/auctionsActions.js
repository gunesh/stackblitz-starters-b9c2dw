export const SET_AUCTIONS = 'SET_AUCTIONS';
export const SET_AUCTIONS1 = 'SET_AUCTIONS1';
export const ADD_AUCTIONS = 'ADD_AUCTIONS';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_ROLES = 'SET_ROLES';
export const STRT_AUCTION = 'STRT_AUCTION';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;//'http://10.33.82.99:3000/api/v1/auction/';


export function setAuctions(auctions) {
    return {
        type: SET_AUCTIONS,
        auctions
    }
}

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        // let error = new Error(response.statusText)
        // error.response = response;
        // throw error;
    }
}
export function fetchauctions(data) {
    console.log(data, "this is fetchauctionsfetchauctionsfetchauctions")
    const JwTtoken = window.localStorage.getItem('token')
    return dispatch => {
        return fetch(BASE_URL + 'auction/cms', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken
            }
        })
            .then(res => res.json())
            .then(jsondata =>
                dispatch(setAuctions(jsondata.auction)))
    }
}
export function updateAuction(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'auction/cms', {
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

export function saveAuctions(data) {
    return dispatch => {
        const JwTtoken = window.localStorage.getItem('token')
        return fetch(BASE_URL + 'postauction/cms', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken
            }
        }).then(handleResponse)
            .then(function (data) {
                if (data && data.status && data.status == 201) {
                    //  alert('Auction Added Successfylly');                    
                    return data;

                } else {
                    return data;
                }
            });
    }
}

export function startAuctionTimer(auction_data) {
    return dispatch => {
        return fetch(BASE_URL + 'startauction/cms', {
            method: 'post',
            body: JSON.stringify(auction_data),
            headers: {
                "content-Type": "application/json"
            }
        })
            .then(function (response) {
                return response.json();
            }

            )
    }
}
export function revealProductInfo(data) {
    return dispatch => {
        return fetch(BASE_URL + 'productreveal/cms', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(function (response) {
            return response.json();
        }

        )
    }
}

export function revealWinnerInfo(data) {
    return dispatch => {
        return fetch(BASE_URL + 'winreveal/cms', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(function (response) {
            return response.json();
        }

        )
    }
}
export function addAuction(auctions) {
    return {
        type: ADD_AUCTIONS,
        auctions
    }
}

