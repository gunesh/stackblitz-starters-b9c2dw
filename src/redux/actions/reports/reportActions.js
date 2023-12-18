export const SET_FAILED_ORDERS = 'SET_FAILED_ORDERS';
export const SET_SUCCESS_ORDERS = 'SET_SUCCESS_ORDERS';
export const SET_AUCTION_AMOUNT = 'SET_AUCTION_AMOUNT';
export const SET_EPISODE_LEVEL = 'SET_EPISODE_LEVEL';
export const SET_AUCTION_LEVEL_REPORT = 'SET_AUCTION_LEVEL_REPORT';
export const LIVE_AUCTION = 'LIVE_AUCTION';
export const SET_SUCCESS_PRODUCT_ORDERS ='SET_SUCCESS_PRODUCT_ORDERS';
const BASE_URL = process.env.REACT_APP_API_BASE_URL + 'reports/';
var saveAs = require('file-saver');


export function fetchAuctionAmount(data) {
    const JwTtoken = window.localStorage.getItem('token')

    return dispatch => {
        fetch(BASE_URL + 'cms/auctionAmount', {
            method: 'POST',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(jsondata =>
                dispatch(addAuctionAmount(jsondata.auctionAmount)))
    }
}
export function fetchLiveAuction(data) {
    const JwTtoken = window.localStorage.getItem('token')
    return dispatch => {
        return fetch(BASE_URL + 'cms/liveAuction', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken
            }
        }).then(handleResponse)
            .then(data1 => { dispatch(addLiveAuction(data1.auctionAmount)); return data1 });
    }
}

export function addLiveAuction(reports) {
    return {
        type: LIVE_AUCTION,
        reports
    }
}
export function addAuctionAmount(auctionAmount) {
    return {
        type: SET_AUCTION_AMOUNT,
        auctionAmount
    }
}

export function addSuccessOrders(reports) {
    return {
        type: SET_SUCCESS_ORDERS,
        reports
    }
}
export function addSuccessCoinOrders(reports) {
    console.log(">>>reports",reports)
    return {
        type: SET_SUCCESS_PRODUCT_ORDERS,
        reports
    }
}

export function addEpisodeLevel(reports) {
    return {
        type: SET_EPISODE_LEVEL,
        reports
    }
}
export function addAuctionLevelReport(reports) {
    return {
        type: SET_AUCTION_LEVEL_REPORT,
        reports
    }
}

export function addFailedOrders(reports) {
    return {
        type: SET_FAILED_ORDERS,
        reports
    }
}

// export function fetchSuccessOrders(data) {
//     const JwTtoken = window.localStorage.getItem('token')

//     return dispatch => {
//         fetch(BASE_URL + 'cms/successOrders', {
//             method: 'POST',
//             headers: {
//                 "content-Type": "application/json",
//                 'Authorization': 'Bearer ' + JwTtoken
//             },
//             body: JSON.stringify(data)
//         })
//             .then(res => res.json())
//             .then(jsondata =>
//                 dispatch(addSuccessOrders(jsondata.successOrders)))
//     }
// }
export function fetchSuccessOrders(data) {
    const JwTtoken = window.localStorage.getItem('token')
    return dispatch => {
        return fetch(BASE_URL + 'cms/successOrders', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken
            }
        }).then(handleResponse)
            .then(data1 => { dispatch(addSuccessOrders(data1.successOrders)); return data1 });
    }
}
export function fetchSuccessProductOrders(data) {
    const JwTtoken = window.localStorage.getItem('token')
    return dispatch => {
        return fetch(BASE_URL + 'cms/successProductOrders', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken
            }
        }).then(handleResponse)
            .then(data => { dispatch(addSuccessCoinOrders(data.successProductOrders)); return data });
    }
}

export function fetchEpisodeLevel(data) {
    const JwTtoken = window.localStorage.getItem('token')
    return dispatch => {
        return fetch(BASE_URL + 'cms/episodeLevel', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken
            }
        }).then(handleResponse)
            .then(data1 => { dispatch(addEpisodeLevel(data1.auctions)); return data1 });
    }
}
export function fetchAuctionLevelReport(data) {
    const JwTtoken = window.localStorage.getItem('token')
    return dispatch => {
        return fetch(BASE_URL + 'cms/auctionsSummary', {
            method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken
            }
        }).then(res => res.json()).then(data1 => { dispatch(addAuctionLevelReport(data1.auctionsSummary)); return data1 });
    }
}

export function fetchAuctionLevelReportDownload(id) {
    const JwTtoken = window.localStorage.getItem('token')
    return dispatch => {
        return fetch(BASE_URL + 'cms/auctionDetails?auction_id=' + id, {
            method: 'get',
            headers: {
                "content-Type": "text/csv",
                'Authorization': 'Bearer ' + JwTtoken
            },
            responseType: 'blob'
        }).then(response => response.blob())
            .then(blob => saveAs(blob, 'AuctionBidsDetail.csv'));
    }
}



export function fetchSuccessfulOrderPdf(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'cms/invoice', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": 'application/json' ,
                'Authorization': 'Bearer ' + JwTtoken
            },
        }).then(function (response) {
                return response.json();
            })
    }
}



export function fetchFailedOrders(data) {
    const JwTtoken = window.localStorage.getItem('token')
    return dispatch => {
        return fetch(BASE_URL + 'cms/failedOrders', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer ' + JwTtoken
            }
        }).then(handleResponse)
            .then(data1 => { dispatch(addFailedOrders(data1.failedOrders)); return data1 });
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
