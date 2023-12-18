export const SAVE_IMG = 'SAVE_IMG';

const BASE_URL =process.env.REACT_APP_API_BASE_URL+'imageupload/';

export function saveImg(image) {
    return {
        type: SAVE_IMG,
        image
    }
}



export function uploadImage(data) {    
    const Img = new FormData()
      Img.append('Images',data)
    
    const JwTtoken = window.localStorage.getItem('token');
    return dispatch => {
       return fetch(BASE_URL + 'cms',{
             method: 'POST',
             body:Img ,
            headers: {
                'Authorization': 'Bearer '+ JwTtoken,
            }
        })
            .then(res => res.json())
            .then(jsondata =>
             dispatch(saveImg(jsondata))
               )
    }
}




