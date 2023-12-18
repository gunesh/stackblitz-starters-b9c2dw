// smhkm2 new files 
import { SET_SETTINGS } from '../../actions/notification/notificationActions';
const initState = {
    setting: []
};

const notificationReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_SETTINGS:
            return { ...state, setting: action.setting };
        default:
            return state;
    }
};

export default notificationReducer;