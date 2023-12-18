import { SET_BANNER,ADD_ONBOARDING,UPDATE_ADD_ONBOARDING,CHANGE_STATUS} from '../../actions/masterDataFiles/bannerActions';
const initState = {
    onboarding: []
};

const bannerReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_BANNER:
            return { ...state, onboarding: action.onboarding };
            case ADD_ONBOARDING:
                 return { ...state, onboarding: state.onboarding.concat([action.onboarding])}
                   case UPDATE_ADD_ONBOARDING:
                     var returndata = state.onboarding.map(item => {
                if (item._id === action.onboarding.id) return action.onboarding;
                return item;
                
            })
            case CHANGE_STATUS:
                var returndata = state.onboarding.map(item => {
                if (item._id === action.onboarding.id) return action.onboarding;
                return item;
                
            })
        default:
            return state;
    }
};

export default bannerReducer;