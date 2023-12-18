import { SAVE_IMG } from '../../actions/imageUpload/uploadImageAction';
const initState = {
    image: []
};

const uploadImgReducer = (state = initState, action) => {
    switch (action.type) {
        case SAVE_IMG:
            return { ...state, image: action.image.location};
        default:
            return state;
    }
};

export default uploadImgReducer;