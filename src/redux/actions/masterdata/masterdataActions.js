export const SET_BUYCATEGORY = 'SET_BUYCATEGORY';
export const ADD_BUYCATEGORY = 'ADD_BUYCATEGORY';
export const UPDATE_BUYCATEGORY = 'UPDATE_BUYCATEGORY';
export const DELETE_BUYCATEGORY = 'DELETE_BUYCATEGORY';

export const SET_CUSTOMISEFEED = 'SET_CUSTOMISEFEED';
export const ADD_CUSTOMISEFEED = 'ADD_CUSTOMISEFEED';
export const UPDATE_CUSTOMISEFEED = 'UPDATE_CUSTOMISEFEED';
export const DELETE_CUSTOMISEFEED = 'DELETE_CUSTOMISEFEED';

export const SET_CATEGORYTYPES = 'SET_CATEGORYTYPES';
export const ADD_CATEGORYTYPES = 'ADD_CATEGORYTYPES';
export const DELETE_CATEGORYTYPES = 'DELETE_CATEGORYTYPES';
export const UPDATE_CATEGORYTYPES = 'UPDATE_CATEGORYTYPES';

export const SET_DISPLAYLANUGUAGES = 'SET_DISPLAYLANUGUAGES';
export const ADD_DISPLAYLANUGUAGES = 'ADD_DISPLAYLANUGUAGES';
export const DELETE_DISPLAYLANUGUAGES = 'DELETE_DISPLAYLANUGUAGES';
export const UPDATE_DISPLAYLANUGUAGES = 'UPDATE_DISPLAYLANUGUAGES';

export const SET_INTERESTS = 'SET_INTERESTS';
export const ADD_INTERESTS = 'ADD_INTERESTS';
export const DELETE_INTERESTS = 'DELETE_INTERESTS';
export const UPDATE_INTERESTS = 'UPDATE_INTERESTS';


export const SET_ONBOARDING = 'SET_ONBOARDING';
export const ADD_ONBOARDING = 'ADD_ONBOARDING';
export const DELETE_ONBOARDING = 'DELETE_ONBOARDING';
export const UPDATE_ONBOARDING = 'UPDATE_ONBOARDING';


export const SET_POSTCATEGORY = 'SET_POSTCATEGORY';
export const ADD_POSTCATEGORY = 'ADD_POSTCATEGORY';
export const DELETE_POSTCATEGORY = 'DELETE_POSTCATEGORY';
export const UPDATE_POSTCATEGORY = 'UPDATE_POSTCATEGORY';


const BASE_URL = 'http://52.66.158.188:3002/api/v1/md';

export function fetchbuycategory() {
    return dispatch => {
        fetch(BASE_URL + '/getbuycategory')
            .then(res => res.json())
            .then(jsondata => dispatch(setBuyCategory(jsondata)))
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
export function savebuycategory(data) {
    return dispatch => {
        return fetch(BASE_URL + '/postbuycategory', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(addBuyCategory(data.data)));
    }
}
export function updatebuycategory(data) {
    return dispatch => {
        return fetch(BASE_URL + '/putbuycategory', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(updateBuyCategory(data.data)));
    }
}
export function deletebuycategory(category_id) {

    return dispatch => {
        fetch(BASE_URL + `/deletebuycategory/${category_id}`, {
            method: 'delete',
            headers: {
                "content-Type": "application/json"
            }
        })
            .then(data => dispatch(BuyCategoryDeleted(category_id)))
    }
}
export function fetchcustomisefeed() {
    return dispatch => {
        fetch(BASE_URL + '/getcustomisefeed')
            .then(res => res.json())
            .then(jsondata => dispatch(setCustomisefeed(jsondata)))
    }
}
export function updatecustomisefeed(data) {
    return dispatch => {
        return fetch(BASE_URL + '/putcustomisefeed', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(customisefeedUpdated(data.data)));
    }
}
export function savecustomisefeed(data) {
    return dispatch => {
        return fetch(BASE_URL + '/postcustomisefeed', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(addCustomisefeed(data.data)));
    }
}
export function deletecustomisefeed(category_id) {

    return dispatch => {
        fetch(BASE_URL + `/deletecustomisefeed/${category_id}`, {
            method: 'delete',
            headers: {
                "content-Type": "application/json"
            }
        })
            .then(data => dispatch(CustomiseFeedDeleted(category_id)))
    }
}
export function fetchcategorytypes() {
    return dispatch => {
        fetch(BASE_URL + '/getcategorytypes')
            .then(res => res.json())
            .then(jsondata => dispatch(setCategoryTypes(jsondata)))
    }
}
export function savecategorytypes(data) {
    return dispatch => {
        return fetch(BASE_URL + '/postcategorytypes', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(addCategoryTypes(data.data)));
    }
}
export function deletecategorytypes(category_id) {

    return dispatch => {
        fetch(BASE_URL + `/deletecategorytypes/${category_id}`, {
            method: 'delete',
            headers: {
                "content-Type": "application/json"
            }
        })
            .then(data => dispatch(CategoryTypesDeleted(category_id)))
    }
}
export function updatecategorytypes(data) {
    return dispatch => {
        return fetch(BASE_URL + '/putcategorytypes', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(CategoryTypesUpdated(data.data)));
    }
}
export function fetchdisplaylanguages() {
    return dispatch => {
        fetch(BASE_URL + '/getdisplaylanguages')
            .then(res => res.json())
            .then(jsondata => dispatch(setDisplayLanuguages(jsondata)))
    }
}
export function savedisplaylanguages(data) {
    return dispatch => {
        return fetch(BASE_URL + '/postdisplaylanguage', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(addDisplayLanuguages(data.data)));
    }
}
export function updatedisplaylanguages(data) {
    return dispatch => {
        return fetch(BASE_URL + '/putdisplaylanguages', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(DisplayLanuguagesUpdated(data.data)));
    }
}

export function deletedisplaylanguages(language_id) {

    return dispatch => {
        fetch(BASE_URL + `/deletedisplaylanguages/${language_id}`, {
            method: 'delete',
            headers: {
                "content-Type": "application/json"
            }
        })
            .then(data => dispatch(DisplayLanuguagesDeleted(language_id)))
    }
}
export function fetchinterests() {
    return dispatch => {
        fetch(BASE_URL + '/getinterests')
            .then(res => res.json())
            .then(jsondata => dispatch(setinterests(jsondata)))
    }
}
export function saveinterests(data) {
    return dispatch => {
        return fetch(BASE_URL + '/postinterests', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(addinterests(data.data)));
    }
}
export function deleteinterests(id) {

    return dispatch => {
        fetch(BASE_URL + `/deleteinterests/${id}`, {
            method: 'delete',
            headers: {
                "content-Type": "application/json"
            }
        })
            .then(data => dispatch(interestsDeleted(id)))
    }
}
export function updateinterests(data) {
    return dispatch => {
        return fetch(BASE_URL + '/putinterests', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(interestsUpdated(data.data)));
    }
}
export function fetchonboarding() {
    return dispatch => {
        fetch(BASE_URL + '/getonboarding')
            .then(res => res.json())
            .then(jsondata => dispatch(setonboarding(jsondata)))
    }
}
export function saveonboarding(data) {
    return dispatch => {
        return fetch(BASE_URL + '/postonboarding', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(addonboarding(data.data)));
    }
}
export function deleteonboarding(id) {

    return dispatch => {
        fetch(BASE_URL + `/deleteonboarding/${id}`, {
            method: 'delete',
            headers: {
                "content-Type": "application/json"
            }
        })
            .then(data => dispatch(onboardingDeleted(id)))
    }
}
export function updateonboarding(data) {
    return dispatch => {
        return fetch(BASE_URL + '/putonboarding', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(onboardingUpdated(data.data)));
    }
}
export function fetchpostcategory() {
    return dispatch => {
        fetch(BASE_URL + '/getpostcategory')
            .then(res => res.json())
            .then(jsondata => dispatch(setpostcategory(jsondata)))
    }
}
export function savepostcategory(data) {
    return dispatch => {
        return fetch(BASE_URL + '/postcategory', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(addpostcategory(data.data)));
    }
}
export function deletepostcategory(category_id) {

    return dispatch => {
        fetch(BASE_URL + `/deletepostcategory/${category_id}`, {
            method: 'delete',
            headers: {
                "content-Type": "application/json"
            }
        })
            .then(data => dispatch(postcategoryDeleted(category_id)))
    }
}
export function updatepostcategory(data) {
    return dispatch => {
        return fetch(BASE_URL + '/putpostcategory', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(postcategoryUpdated(data.data)));
    }
}

export function setBuyCategory(buycategory) {
    return {
        type: SET_BUYCATEGORY,
        buycategory
    }
}
export function addBuyCategory(buycategory) {
    return {
        type: ADD_BUYCATEGORY,
        buycategory
    }
}
export function updateBuyCategory(buycategory) {
    return {
        type: UPDATE_BUYCATEGORY,
        buycategory
    }

}
export function addCustomisefeed(customisefeed) {
    return {
        type: ADD_CUSTOMISEFEED,
        customisefeed
    }
}
export function customisefeedUpdated(customisefeed) {
    return {
        type: UPDATE_CUSTOMISEFEED,
        customisefeed
    }

}
export function CustomiseFeedDeleted(category_id) {
    return {
        type: 'DELETE_CUSTOMISEFEED',
        category_id
    }
}
export function BuyCategoryDeleted(category_id) {
    return {
        type: 'DELETE_BUYCATEGORY',
        category_id
    }
}
export function setCustomisefeed(customisefeed) {
    return {
        type: SET_CUSTOMISEFEED,
        customisefeed
    }
}
export function addCategoryTypes(categorytypes) {
    return {
        type: ADD_CATEGORYTYPES,
        categorytypes
    }
}
export function CategoryTypesDeleted(category_id) {
    return {
        type: 'DELETE_CATEGORYTYPES',
        category_id
    }
}
export function CategoryTypesUpdated(categorytypes) {
    return {
        type: UPDATE_CATEGORYTYPES,
        categorytypes
    }

}
export function setCategoryTypes(categorytypes) {
    return {
        type: SET_CATEGORYTYPES,
        categorytypes
    }
}
export function setDisplayLanuguages(displaylanguages) {
    return {
        type: SET_DISPLAYLANUGUAGES,
        displaylanguages
    }
}
export function addDisplayLanuguages(displaylanguages) {
    return {
        type: ADD_DISPLAYLANUGUAGES,
        displaylanguages
    }
}
export function DisplayLanuguagesUpdated(displaylanguages) {
    return {
        type: UPDATE_DISPLAYLANUGUAGES,
        displaylanguages
    }

}
export function DisplayLanuguagesDeleted(language_id) {
    return {
        type: 'DELETE_DISPLAYLANUGUAGES',
        language_id
    }
}
export function setinterests(interests) {
    return {
        type: SET_INTERESTS,
        interests
    }
}
export function addinterests(interests) {
    return {
        type: ADD_INTERESTS,
        interests
    }
}
export function interestsDeleted(id) {
    return {
        type: 'DELETE_INTERESTS',
        id
    }
}
export function interestsUpdated(interests) {
    return {
        type: UPDATE_INTERESTS,
        interests
    }

}
export function setonboarding(onboarding) {
    return {
        type: SET_ONBOARDING,
        onboarding
    }
}
export function addonboarding(onboarding) {
    return {
        type: ADD_ONBOARDING,
        onboarding
    }
}
export function onboardingDeleted(id) {
    return {
        type: 'DELETE_ONBOARDING',
        id
    }
}
export function onboardingUpdated(onboarding) {
    return {
        type: UPDATE_ONBOARDING,
        onboarding
    }

}
export function setpostcategory(postcategory) {
    return {
        type: SET_POSTCATEGORY,
        postcategory
    }
}
export function addpostcategory(postcategory) {
    return {
        type: ADD_POSTCATEGORY,
        postcategory
    }
}
export function postcategoryDeleted(category_id) {
    return {
        type: 'DELETE_POSTCATEGORY',
        category_id
    }
}
export function postcategoryUpdated(postcategory) {
    return {
        type: UPDATE_POSTCATEGORY,
        postcategory
    }

}