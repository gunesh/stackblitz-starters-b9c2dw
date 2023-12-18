import { FETH_SETTING_INFO} from '../../actions/masterDataFiles/settingsData';
const initState = {
    settingData: []
};

const SettingReducer = (state = initState, action) => {
    
    switch (action.type) {
        case FETH_SETTING_INFO:
            return { ...state, content: action.settingData };
            //  case UPDATE_CONTENT:
            // return { ...state, content: action.content };
        default:
            return state;
    }
};

export default SettingReducer;