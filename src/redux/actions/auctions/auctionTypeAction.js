export const SET_AUCTION_TYPE = 'SET_AUCTION_TYPE';
export const GET_AUCTION_CATEGORIES = 'GET_AUCTION_CATEGORIES';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;//'http://10.33.82.99:3000/api/v1/auctiontype/';

export function setAuctionType(auctionsType) {
    return {
        type: SET_AUCTION_TYPE,
        auctionsType
    }
}
export function getAuctionCategories(auctionsCategories) {
    return {
        type: GET_AUCTION_CATEGORIES,
        auctionsCategories
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
export function fetchauctionsType(data) {
    const JwTtoken = window.localStorage.getItem('token')
    return dispatch => {
        fetch(BASE_URL + 'auctiontype/cms',{
             method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer '+ JwTtoken
            }
        })
            .then(res => res.json())
            .then(jsondata =>
              dispatch(setAuctionType(jsondata.auctionType)) )
    }
}

export function fetchauctionsCategories(data) {
    const JwTtoken = window.localStorage.getItem('token')
    return dispatch => {
        fetch(BASE_URL + 'auction/category/cms',{
             method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer '+ JwTtoken
            }
        })
            .then(res => res.json())
            .then(jsondata =>
              dispatch(getAuctionCategories(jsondata.category)) )
    }
}


