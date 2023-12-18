
export const SET_AUCTION_CATEGORY = 'SET_AUCTION_CATEGORY';
export const ADD_AUCTION_CATEGORY ='ADD_AUCTION_CATEGORY';
export const UPDATE_AUCTION_CATEGORY= 'UPDATE_AUCTION_CATEGORY';
export const CHANGE_STATUS ='CHANGE_STATUS';
const BASE_URL = process.env.REACT_APP_API_BASE_URL+'auction/category/'
export function setAuctionCategory(auctionCategory) {
    console.log(">>>>>>11111",auctionCategory)
    return {
        type: SET_AUCTION_CATEGORY,
        auctionCategory
    }
}
export function addAuctionCategory(auctionCategory) {
     console.log("inreducer:<<<<<<<<<<<<,",auctionCategory)
    return {
        type: ADD_AUCTION_CATEGORY,
        auctionCategory
    }
}
export function AuctioncategoryUpdate(auctionCategory){
 return {
        type:UPDATE_AUCTION_CATEGORY,
        auctionCategory
    }
}

export function changestatus(auctionCategory){
    console.log("auctionCategoryauctionCategory",auctionCategory);
    
     return {
        type:CHANGE_STATUS,
        auctionCategory
    }
}




export function fetchauctionCategory() {
    const JwTtoken = window.localStorage.getItem('token')
    console.log(">>>>>>1111100",JwTtoken)
    return dispatch => {
        fetch(BASE_URL + 'cms',{
             method: 'get',
            headers: {
                "content-Type": "application/json",
                'Authorization': 'Bearer '+ JwTtoken,

            }
        })
            .then(res => res.json())
            .then(auctionCategory => dispatch(setAuctionCategory(auctionCategory.category)))
    }
}

export function AddAuctionCategory(data) {
  
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        fetch(BASE_URL + 'cms',{
             method: 'POST',
             body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer '+ JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(jsondata =>
               dispatch(addAuctionCategory(jsondata.category))
               )
    }
}

export function updateAuctionCategory(data) {
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
        return fetch(BASE_URL + 'cms', {
            method: 'put',
            body: JSON.stringify(data),
           headers: {
                'Authorization': 'Bearer '+ JwTtoken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })  .then(res => res.json())
            .then(jsondata =>
               dispatch(AuctioncategoryUpdate(jsondata))
               )
    }
}

export function changeStatusAuctionCategory(data) {
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
        })  .then(res => res.json())
            .then(jsondata =>
               dispatch(changestatus(jsondata))
               )
    }
}
